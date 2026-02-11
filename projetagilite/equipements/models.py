
from django.db import models
from django.contrib.auth.models import AbstractUser

class Sport(models.TextChoices):
    BADMINTON = "BAD", "Badminton"

class SportLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Débutant"
    AVERAGE = "AVERAGE", "Intermediaire"
    EXPERT = "EXPERT", "Expert"

class Product(models.Model):    
    name = models.TextField()

class SportProductRelation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="sports")
    sport = models.TextField(choices=Sport)

class SportLevelProductRelation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="levels")
    level = models.TextField(choices=SportLevel)

class User(AbstractUser):
    sportsPratique = models.TextField(
        choices=SportLevel
    )

    niveauSportif = models.CharField(
        max_length=10,
        choices=SportLevel.choices,
        default=SportLevel.BEGINNER
    )

    def __str__(self):
        return self.username
