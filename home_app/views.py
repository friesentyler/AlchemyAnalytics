from django.shortcuts import render
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
import os
from django.http import HttpResponse, Http404, JsonResponse

from alchemyanalytics import settings
from home_app import models

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})

def products(request):
    #image_url = request.build_absolute_uri(settings.STATIC_URL + 'images/my_image.png')
    page = request.GET.get('page', 1)
    if request.GET:
        price_low = request.GET.get('price_low', 0)
        price_high = request.GET.get('price_high', float('inf'))
        result = [{
            'name': page,
            'price': price_low,
            'description': price_high,
            'image_url': ['result1', 'result2', 'result3'],
            'item_or_product': "ueet",
            'indicator_or_strategy': 'euesh'
        }]
        return JsonResponse(result)
    else:
        page_size = 5
        offset = (page - 1) * page_size
        queryset = models.Product.objects.order_by('date_created')
        newest_entries = queryset[offset:offset + page_size]
        result = []
        for entry in newest_entries:
            image_url = request.build_absolute_uri(entry.image.name)
            result.append({
                'name': entry.name,
                'price': entry.price,
                'description': entry.description,
                'image_url': image_url,
                'item_or_product': entry.item_or_product,
                'indicator_or_strategy': entry.indicator_or_strategy
            })
        return JsonResponse(result, safe=False)

def checkout(request):
    return render(request, 'HTML/Pages/checkout.html', {})

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