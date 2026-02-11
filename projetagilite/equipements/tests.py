from django.test import TestCase, Client
from django.urls import reverse
from equipements.models import Product, SportLevelProductRelation, SportProductRelation, SportLevel, Sport, Stock
from django.core.exceptions import ValidationError
from equipements.views import get_product
import json
from django.contrib.auth import get_user_model

# Create your tests here.
class TestGetProduct(TestCase):
    
    @classmethod
    def setUp(cls):
        cls.client = Client()
        
        chaussure = Product.objects.create(name="chaussure", price=50.00)
        raquette = Product.objects.create(name="raquette", price=25.00)

        SportProductRelation.objects.create(product=chaussure, sport="BADMINTON")
        SportProductRelation.objects.create(product=raquette, sport="BADMINTON")
        
        SportLevelProductRelation.objects.create(product=chaussure, level="BEGINNER")
        SportLevelProductRelation.objects.create(product=chaussure, level="AVERAGE")
        SportLevelProductRelation.objects.create(product=chaussure, level="EXPERT")
        
        SportLevelProductRelation.objects.create(product=raquette, level="AVERAGE")

    def test_get_all_products(self):
        response = self.client.get("/products")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": 1,
                "levels": ["BEGINNER", "AVERAGE", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure"
            },
            {
                "id": 2,
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette"
            }
        ], json_response)

    def test_adding_product(self):
        volant = Product.objects.create(name="volant", price=5.00)
        SportProductRelation.objects.create(product=volant, sport="BADMINTON")
        SportLevelProductRelation.objects.create(product=volant, level="BEGINNER")
        
        response = self.client.get("/products")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": 1,
                "levels": ["BEGINNER", "AVERAGE", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure"
            },
            {
                "id": 2,
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette"
            },
            {
                "id": 3,
                "levels": ["BEGINNER"],
                "sports": ["BADMINTON"],
                "name": "volant"
            }
        ], json_response)

class UserModelTest(TestCase):
    def test_create_user_with_niveau_sportif(self):
        userModel = get_user_model()

        user = userModel.objects.create_user(
            username="alice",
            password="test1234",
            niveauSportif=SportLevel.AVERAGE,
            sportsPratique=Sport.BADMINTON
        )

        self.assertEqual(user.niveauSportif, SportLevel.AVERAGE)

    def test_default_niveau_sportif(self):
        userModel = get_user_model()

        user = userModel.objects.create_user(
            username="bob",
            password="test1234"
        )

        self.assertEqual(user.niveauSportif, SportLevel.BEGINNER)

class StockModelTest(TestCase):

    def setUp(self):
        self.product = Product.objects.create(
            name="Bike",
            price=1000.00
        )

    def test_create_stock_valid(self):
        stock = Stock.objects.create(
            product=self.product,
            quantity=10
        )
        self.assertEqual(stock.quantity, 10)
        self.assertEqual(stock.product, self.product)

    def test_stock_quantity_cannot_be_negative(self):
        stock = Stock(
            product=self.product,
            quantity=-5
        )

        with self.assertRaises(ValidationError):
            stock.full_clean()

    def test_stock_str_representation(self):
        stock = Stock.objects.create(
            product=self.product,
            quantity=5
        )
        self.assertEqual(str(stock), "Bike - 5")

    def test_stock_requires_product(self):
        stock = Stock(quantity=5)

        with self.assertRaises(ValidationError):
            stock.full_clean()

    def test_delete_product_cascades_to_stock(self):
        stock = Stock.objects.create(
            product=self.product,
            quantity=5
        )

        self.product.delete()

        self.assertEqual(Stock.objects.count(), 0)


