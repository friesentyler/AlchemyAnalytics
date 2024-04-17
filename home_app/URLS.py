"""
URL configuration for alchemyanalytics project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('shop', views.shop, name='shop'),
    path('checkout', views.checkout, name="checkout"),
    path('account', views.account, name="account"),
    path('download/<str:file_name>/', views.download_file, name='download_file'),
    path('products', views.products, name="products"),
    path('user_products', views.user_products, name='user_products'),
    path('purchase', views.purchase, name='purchase'),
    path('create-checkout-session', views.create_checkout_session, name='create-checkout-session')
]
