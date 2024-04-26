from django.shortcuts import render
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
import os
import json
from decouple import config
import stripe
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from alchemyanalytics import settings
from home_app import models
from django.db.models import Case, When, Value, IntegerField

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})

def user_products(request):
    if not request.user.is_authenticated:
        raise PermissionDenied()
    owned_products = models.UserProduct.objects.filter(user=request.user)
    result = []
    for owned_product in owned_products:
        result.append({
            'name': owned_product.product.name,
            'description': owned_product.product.description,
            "download_url": os.path.join(request.get_host(), 'download', os.path.basename(str(owned_product.product.file))),
            'image_url': request.build_absolute_uri(owned_product.product.image.name),
        })
    return JsonResponse(result, safe=False)

def products(request):
    stripe.api_key = config("STRIPE_PRIVATE_KEY")

    page = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', 2))

    queryset = models.Product.objects.all()

    # Annotate queryset with actual prices from Stripe
    queryset = queryset.annotate(
        actual_price=Case(
            *[When(price=product.price, then=Value(stripe.Price.retrieve(product.price).unit_amount)) for product in
              queryset],
            default=Value(0),
            output_field=IntegerField(),
        )
    )

    if request.GET:
        offset = (page - 1) * page_size
        max_price = request.GET.get('max_price', '')
        item_or_package = request.GET.get('item_or_package', '')
        indicator_or_strategy = request.GET.get('indicator_or_strategy', '')
        sort_by = request.GET.get('sort_by', 'newest')

        if max_price:
            queryset = queryset.filter(actual_price__gte=1, actual_price__lte=int(max_price)*100)
        if item_or_package:
            queryset = queryset.filter(item_or_package=item_or_package)
        if indicator_or_strategy:
            queryset = queryset.filter(indicator_or_strategy=indicator_or_strategy)

        # Apply sorting based on actual price
        if sort_by == 'newest':
            queryset = queryset.order_by('-date_created')
        elif sort_by == 'oldest':
            queryset = queryset.order_by('date_created')
        elif sort_by == 'low':
            queryset = queryset.order_by('actual_price')
        elif sort_by == 'high':
            queryset = queryset.order_by('-actual_price')
        else:
            queryset = queryset.order_by('-date_created')

        queryset_len = queryset.count()
        entries = queryset[offset:offset + page_size]

        result = []
        for entry in entries:
            image_url = request.build_absolute_uri(entry.image.name)
            result.append({
                'name': entry.name,
                'price_id': entry.price,
                'price': round(int(entry.actual_price)/100, 2),  # Use actual_price here
                'description': entry.description,
                'image_url': image_url,
                'item_or_package': entry.item_or_package,
                'indicator_or_strategy': entry.indicator_or_strategy,
                'total_number_of_products': queryset_len
            })

        return JsonResponse(result, safe=False)
    else:
        offset = (page - 1) * page_size
        queryset_len = queryset.count()
        newest_entries = queryset[offset:offset + page_size]

        result = []
        for entry in newest_entries:
            image_url = request.build_absolute_uri(entry.image.name)
            result.append({
                'name': entry.name,
                'price_id': entry.price,
                'price': round(int(entry.actual_price)/100, 2),  # Use actual_price here
                'description': entry.description,
                'image_url': image_url,
                'item_or_package': entry.item_or_package,
                'indicator_or_strategy': entry.indicator_or_strategy,
                'total_number_of_products': queryset_len
            })

        return JsonResponse(result, safe=False)

def checkout(request):
    return render(request, 'HTML/Pages/checkout.html', {})

# ideally this should not be csrf_exempt
@csrf_exempt
def purchase(request):
    stripe.api_key = config("STRIPE_PRIVATE_KEY")
    if request.method == "POST":
        if request.user.is_authenticated:
            queryset = models.Product.objects.all()
            queryset = queryset.annotate(
                actual_price=Case(
                    *[When(price=product.price, then=Value(stripe.Price.retrieve(product.price).unit_amount)) for
                      product in
                      queryset],
                    default=Value(0),
                    output_field=IntegerField(),
                )
            )
            post_data = json.loads(request.body.decode("utf-8"))
            new_post_data = []
            for element in post_data:
                for obj in queryset:
                    if obj.name == element['name']:
                        new_post_data.append({'price': obj.price, 'quantity': 1})
            return create_checkout_session(request, new_post_data)
        else:
            return HttpResponse('User is not authenticated', status=403)
    else:
        return HttpResponse('Only POST requests are allowed for this endpoint', status=405)

@csrf_exempt
def create_checkout_session(request, post_data):
    stripe.api_key = config("STRIPE_PRIVATE_KEY")
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email='customer@example.com',
            submit_type='pay',
            billing_address_collection='auto',
            shipping_address_collection={
                'allowed_countries': ['US', 'CA'],
            },
            line_items=post_data,
            mode='payment',
            success_url='https://alchemyanalytix.com/account',
            cancel_url='https://alchemyanalytix.com',
        )
    except Exception as e:
        return HttpResponseServerError(f"An error occurred: {e}")

    return JsonResponse({'sessionId': checkout_session.id, 'publicKey': config('STRIPE_PUBLIC_KEY')})

def account(request):
    if request.user.is_authenticated:
        return render(request, 'HTML/Pages/account.html', {})
    else:
        raise PermissionDenied()

def download_file(request, file_name):
    # Define the custom directory where your files are stored
    custom_directory = "media/"

    file_path = os.path.join(custom_directory, file_name)

    # Ensure user is authenticated and owns the product
    if not request.user.is_authenticated:
        raise PermissionDenied()
    user_owns_product = models.UserProduct.objects.filter(user=request.user, product__file__icontains=file_name).exists()
    if not user_owns_product:
        raise PermissionDenied()

    # Check if the file exists
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            # to allow for redirects in the future after downloading we could maybe do something like this
            # https://stackoverflow.com/questions/66645284/allow-user-to-download-file-and-then-redirect-to-other-page
            return response
    else:
        raise Http404()

@csrf_exempt
def stripe_webhook(request):
    if request.method == 'POST':
        payload = request.body
        sig_header = request.headers['Stripe-Signature']

        # Verify the webhook signature
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, config('STRIPE_ENDPOINT_SECRET')
            )
        except ValueError as e:
            # Invalid payload
            return JsonResponse({'error': str(e)}, status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return JsonResponse({'error': str(e)}, status=400)

        # Handle the event
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            #print(session)
            #line_items = session['display_items']
            #print(line_items)
            # Process checkout completion event
            #json_result = []
            '''for line_item in line_items:
                print(line_item)
                price_id = line_item['price']['id']
                product = models.Product.objects.get(price_id=price_id)
                json_result.append({'item': product})'''

        # Respond with a success status
        return JsonResponse({"succeeded": True})

        # Respond with an error for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)