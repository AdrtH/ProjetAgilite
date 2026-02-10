from django.db import models

class Sport(models.TextChoices):
    BADMINTON = "BAD", "Badminton"

class SportLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Débutant"
    AVERAGE = "AVERAGE", "Intermediaire"
    EXPERT = "EXPERT", "Expert"

class Product(models.Model):    
    name = models.TextField()

class SportProductRelation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sport = models.TextField(choices=Sport)

class SportLevelProductRelation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    level = models.TextField(choices=SportLevel)
