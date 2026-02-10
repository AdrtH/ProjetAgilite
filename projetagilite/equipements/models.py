
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
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sport = models.TextField(choices=Sport)

class SportLevelProductRelation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    level = models.TextField(choices=SportLevel)

class User(AbstractUser):
    sportsPratique = models.ManyToManyField(
        Sport,
        blank=True,
        related_name="users"
    )

    niveauSportif = models.CharField(
        max_length=10,
        choices=SportLevel.choices,
        default=SportLevel.BEGINNER
    )

    def __str__(self):
        return self.username