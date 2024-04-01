from django.shortcuts import render
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
import os
from django.http import HttpResponse, Http404
from home_app import models

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})

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