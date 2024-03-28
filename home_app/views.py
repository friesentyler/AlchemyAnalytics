from django.shortcuts import render
from django.core.exceptions import PermissionDenied

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})

def checkout(request):
    return render(request, 'HTML/Pages/checkout.html', {})

def purchasedproducts(request):
    if request.user.is_authenticated:
        return render(request, 'HTML/Pages/purchasedproducts.html', {})
    else:
        raise PermissionDenied()