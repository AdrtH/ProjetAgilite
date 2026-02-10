from django.db import models

class Sport(models.TextChoices):
    BADMINTON = "BAD", ("BADMINTON")

class Product(models.Model):    
    name = models.TextField()
#    sport_name = models.TextField(choices=Sport)

class SportsOfProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sport_name = models.TextField(choices=Sport)