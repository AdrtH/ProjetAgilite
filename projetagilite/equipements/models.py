
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Sport(models.TextChoices):
    FOOTBALL = "FOOTBALL", "Football"
    BASKETBALL = "BASKETBALL", "Basketball"
    TENNIS = "TENNIS", "Tennis"
    NATATION = "NATATION", "Natation"
    COURSE = "COURSE", "Course à pied"
    CYCLISME = "CYCLISME", "Cyclisme"

class SportModel(models.Model):
    code = models.CharField(
        max_length=30,
        choices=Sport.choices,
        unique=True
    )

    def __str__(self):
        return self.get_code_display()

class NiveauSportif(models.TextChoices):
    DEBUTANT = "DEBUTANT", "Débutant"
    CONFIRME = "CONFIRME", "Confirmé"
    EXPERT = "EXPERT", "Expert"



class User(AbstractUser):
    sportsPratique = models.ManyToManyField(
        SportModel,
        blank=True,
        related_name="users"
    )

    niveauSportif = models.CharField(
        max_length=10,
        choices=NiveauSportif.choices,
        default=NiveauSportif.DEBUTANT
    )

    def __str__(self):
        return self.username
# 
