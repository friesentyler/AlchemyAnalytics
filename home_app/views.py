from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {})

def shop(request):
    return render(request, 'HTML/Pages/shop.html', {})
