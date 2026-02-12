from django.test import TestCase, Client
from django.urls import reverse
from equipements.models import Product, SportLevelProductRelation, SportProductRelation, SportLevel, Sport
from equipements.views import get_product
import json
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from equipements.models import Product,User
from django.contrib.auth.hashers import make_password
# Create your tests here.

class ProductModelTest(TestCase):

    def test_create_product_with_all_fields(self):
        product = Product.objects.create(
            name="Laptop",
            price=999.99,
            image="https://example.com/image.jpg"
        )
        self.assertEqual(product.name, "Laptop")
        self.assertEqual(product.price, 999.99)
        self.assertEqual(product.image, "https://example.com/image.jpg")

    def test_create_product_with_missing_price(self):
        product = Product.objects.create(
            name="Laptop",
            image="https://example.com/image.jpg"
        )
        self.assertEqual(product.name, "Laptop")
        self.assertEqual(product.price, 0.00)  # Default price
        self.assertEqual(product.image, "https://example.com/image.jpg")

    def test_create_product_with_missing_name(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                price=999.99,
                image="https://example.com/image.jpg"
            )
            product.full_clean()  # Trigger validation

    def test_create_product_with_missing_image_url(self):
        product = Product.objects.create(
            name="Mouse",
            price=29.90
        )
        self.assertEqual(product.image, None)

    def test_create_product_with_invalid_price(self):
        product = Product(
            name="Laptop",
            price=-10.00,
            image="https://example.com/image.jpg"
        )

        with self.assertRaises(ValidationError):
            product.full_clean()
    
    def test_create_product_with_invalid_image_url(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                name="Laptop",
                price=999.99,
                image="not-a-valid-url"  # Invalid URL
            )
            product.full_clean()  # Trigger validation

class TestGetProduct(TestCase):
    
    @classmethod
    def setUp(cls):
        cls.client = Client()
        
        chaussure = Product.objects.create(name="chaussure")
        raquette = Product.objects.create(name="raquette")

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
        volant = Product.objects.create(name="volant")
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


class TestGetSports(TestCase):
    def test_get_all_sports(self):
        response = self.client.get("/sports")
        json_response = json.loads(response.content.decode('utf-8'))
        self.assertEqual([
            {
                "key": "BAD",
                "name": "Badminton"
            }
        ], json_response)

class TestPostRegister(TestCase):

    def test_register_new_user(self):
        response = self.client.post("/register", json.dumps({
            "name": "charlie",
            "password": "test1234",
            "sport": "BADMINTON",
            "niveauSportif": "AVERAGE"
        }), content_type="application/json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode("utf-8"), '"success"')
        self.assertTrue(User.objects.filter(username="charlie").exists())

    def test_register_existing_user(self):
        User.objects.create_user(username="dave", password="test1234")

        response = self.client.post("/register", json.dumps({
            "name": "dave",
            "password": "test1234",
            "sport": "BADMINTON",
            "niveauSportif": "AVERAGE"
        }), content_type="application/json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Utilisateur existant'})

class TestLogin(TestCase):
    def test_login_successful(self):
        user = User.objects.create_user(username="eve")
        user.set_password("apagnan")
        user.save()
        response=self.client.post("/login",json.dumps({
            "name":"eve",
            "password":"apagnan"
        }),content_type="applications/json")
        self.assertEqual(response.status_code,200)

    def test_login_failed(self):
        user = User.objects.create_user(username="eve")
        user.set_password("apagnan")
        user.save()
        response=self.client.post("/login",json.dumps({
            "name":"eve",
            "password":"2pagnan"
        }),content_type="applications/json")
        self.assertEqual(response.status_code,400)

    def test_login_wrong_user(self):
        user = User.objects.create_user(username="eve")
        user.set_password("apagnan")
        user.save()
        response=self.client.post("/login",json.dumps({
            "name":"MACRON_EXPLOSION",
            "password":"apagnan"
        }),content_type="applications/json")
        self.assertEqual(response.status_code,400)
