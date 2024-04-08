from django.shortcuts import render
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
import os
from django.http import HttpResponse, Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from alchemyanalytics import settings
from home_app import models

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
    # should be an integer
    page = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', 2))
    if request.GET:
        offset = (page - 1) * page_size
        # should be a number float or int
        max_price = request.GET.get('max_price', '')
        # should be a string: item, package
        item_or_package = request.GET.get('item_or_package', '')
        # should be a string: indicator, strategy
        indicator_or_strategy = request.GET.get('indicator_or_strategy', '')
        # should be a string: newest, oldest, lowest, highest
        sort_by = request.GET.get('sort_by', 'newest')
        if sort_by == 'newest':
            queryset = models.Product.objects.order_by('-date_created')
        elif sort_by == 'oldest':
            queryset = models.Product.objects.order_by('date_created')
        elif sort_by == 'low':
            queryset = models.Product.objects.order_by('price')
        elif sort_by == 'high':
            queryset = models.Product.objects.order_by('-price')
        else:
            queryset = models.Product.objects.order_by('-date_created')
        queryset_len = len(queryset)
        entries = queryset
        if max_price:
            entries = entries.filter(price__gte=1, price__lte=max_price)
        if item_or_package:
            entries = entries.filter(item_or_package=item_or_package)
        if indicator_or_strategy:
            entries = entries.filter(indicator_or_strategy=indicator_or_strategy)

        entries = entries[offset:offset + page_size]
        result = []
        for entry in entries:
            image_url = request.build_absolute_uri(entry.image.name)
            result.append({
                'name': entry.name,
                'price': entry.price,
                'description': entry.description,
                'image_url': image_url,
                'item_or_package': entry.item_or_package,
                'indicator_or_strategy': entry.indicator_or_strategy,
                'total_number_of_products': queryset_len
            })
        return JsonResponse(result, safe=False)
    else:
        offset = (page - 1) * page_size
        queryset = models.Product.objects.order_by('date_created')
        queryset_len = len(queryset)
        newest_entries = queryset[offset:offset + page_size]
        result = []
        for entry in newest_entries:
            image_url = request.build_absolute_uri(entry.image.name)
            result.append({
                'name': entry.name,
                'price': entry.price,
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
    if request.method == "POST":
        if request.user.is_authenticated:
            import json

            post_data = json.loads(request.body.decode("utf-8"))

            print(post_data)
        else:
            return HttpResponse('User is not authenticated', status=403)
    else:
        return HttpResponse('Only POST requests are allowed for this endpoint', status=405)

    return HttpResponse("HELLO")

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