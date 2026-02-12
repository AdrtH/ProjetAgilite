from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
import uuid

class Sport(models.TextChoices):
    BADMINTON = "BADMINTON", "Badminton"
    BASKETBALL = "BASKETBALL", "Basketball"
    YOGA = "YOGA", "YOGA"
    NATATION = "NATATION", "NATATION"
    MUSCULATION = "MUSCULATION", "MUSCULATION"
    CYCLISME = "CYCLISME", "CYCLISME"
    FOOTBALL = "FOOTBALL", "FOOTBALL"
    RANDONNEE = "RANDONNEE", "RANDONNEE"
    RUNNING = "RUNNING", "RUNNING"
    TENNIS = "TENNIS", "TENNIS"

class SportLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Débutant"
    AVERAGE = "AVERAGE", "Intermédiaire"
    EXPERT = "EXPERT", "Expert"

class Product(models.Model):
    id = models.TextField(primary_key=True)  # Auto-incrementing ID as primary key
    sku = models.CharField(max_length=50)
    name = models.TextField()
    description = models.TextField()
    category = models.TextField()
    brand = models.TextField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0)]
    )
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0)])
    review_count = models.IntegerField(default=0)
    warranty_months = models.IntegerField(default=0)
    delivery_days = models.IntegerField(default=0)
    in_stock = models.BooleanField(default=False)  # Representing 0,1 as Boolean
    stock_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    card_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = str(uuid.uuid4())  # Use UUID if no ID provided
        super().save(*args, **kwargs)

class ProductSports(models.Model):
    pk = models.CompositePrimaryKey("product_id", "sport")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="sports")
    sport = models.CharField(max_length=50, choices=Sport.choices)

    class Meta:
        unique_together = (('product', 'sport'),)

class ProductLevels(models.Model):
    pk = models.CompositePrimaryKey("product_id", "level")    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="levels")
    level = models.CharField(max_length=10, choices=SportLevel.choices)

    class Meta:
        unique_together = (('product', 'level'),)

class ProductFeatures(models.Model):
    pk = models.CompositePrimaryKey("product_id", "position")        
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="features")
    position = models.IntegerField()
    feature = models.TextField()

    class Meta:
        unique_together = (('product', 'position'),)

class ProductImages(models.Model):
    pk = models.CompositePrimaryKey("product_id", "position")            
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    position = models.IntegerField()
    image_url = models.URLField()
    is_card = models.BooleanField(default=False)

    class Meta:
        unique_together = (('product', 'position'),)

class ProductStoreStock(models.Model):
    pk = models.CompositePrimaryKey("product_id", "store_name")            
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="store_stock")
    store_name = models.CharField(max_length=100)
    stock = models.IntegerField()

    class Meta:
        unique_together = (('product', 'store_name'),)

class User(AbstractUser):
    sportsPratique = models.CharField(
        max_length=50,
        choices=Sport.choices,
        blank=True,
        null=True
    )

    niveauSportif = models.CharField(
        max_length=10,
        choices=SportLevel.choices,
        default=SportLevel.BEGINNER
    )

    def __str__(self):
        return self.username
