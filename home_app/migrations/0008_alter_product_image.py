# Generated by Django 5.0.3 on 2024-04-06 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_app', '0007_product_date_created_product_indicator_or_strategy_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.FileField(default='default_img.txt', null=True, upload_to='static/Images'),
        ),
    ]
