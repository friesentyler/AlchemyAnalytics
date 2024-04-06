from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

ITEM_OR_PRODUCT = (
    ('Item','Item'),
    ('Product', 'Product')
)

INDICATOR_OR_STRATEGY = (
    ('Indicator', 'Indicator'),
    ('Strategy', 'Strategy')
)

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(default=timezone.now)
    item_or_product = models.CharField(max_length=100, choices=ITEM_OR_PRODUCT, null=True)
    indicator_or_strategy = models.CharField(max_length=100, choices=INDICATOR_OR_STRATEGY, null=True)
    image = models.FileField(upload_to='static/Images', default="default_img.txt", null=True)
    file = models.FileField(upload_to='media/', default="default_file.txt", null=True)

    def __str__(self):
        return self.name



class UserProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
