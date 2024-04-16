from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

ITEM_OR_PACKAGE = (
    ('item','item'),
    ('package', 'package')
)

INDICATOR_OR_STRATEGY = (
    ('indicator', 'indicator'),
    ('strategy', 'strategy')
)

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    date_created = models.DateTimeField(default=timezone.now)
    item_or_package = models.CharField(max_length=100, choices=ITEM_OR_PACKAGE, null=True)
    indicator_or_strategy = models.CharField(max_length=100, choices=INDICATOR_OR_STRATEGY, null=True)
    image = models.FileField(upload_to='static/Images', default="/static/Images/product.png", null=True)
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
