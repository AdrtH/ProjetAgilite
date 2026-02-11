from django.test import TestCase, Client
from django.urls import reverse
from equipements.models import Product, ProductLevels, ProductSports, SportLevel, Sport
from equipements.views import get_product
import json
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from equipements.models import Product,User

# Create your tests here.

class ProductModelTest(TestCase):

    def test_create_product_with_all_fields(self):
        product = Product.objects.create(
            id="laptop",
            name="Laptop",
            price=999.99,
            card_image="https://example.com/card_image.jpg"
        )
        self.assertEqual(product.name, "Laptop")
        self.assertEqual(product.price, 999.99)
        self.assertEqual(product.card_image, "https://example.com/card_image.jpg")

    def test_create_product_with_missing_price(self):
        product = Product.objects.create(
            id="laptop",            
            name="Laptop",
            card_image="https://example.com/card_image.jpg"
        )
        self.assertEqual(product.name, "Laptop")
        self.assertEqual(product.price, 0.00)  # Default price
        self.assertEqual(product.card_image, "https://example.com/card_image.jpg")

    def test_create_product_with_missing_name(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                id="laptop",
                price=999.99,
                card_image="https://example.com/card_image.jpg"
            )
            product.full_clean()  # Trigger validation

    def test_create_product_with_missing_card_image_url(self):
        product = Product.objects.create(
            id="Mouse",
            name="Mouse",
            price=29.90
        )
        self.assertEqual(product.card_image, None)

    def test_create_product_with_invalid_price(self):
        product = Product(
            id="laptop",
            name="Laptop",
            price=-10.00,
            card_image="https://example.com/card_image.jpg"
        )

        with self.assertRaises(ValidationError):
            product.full_clean()
    
    def test_create_product_with_invalid_card_image_url(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                id="laptop",
                name="Laptop",
                price=999.99,
                card_image="not-a-valid-url"  # Invalid URL
            )
            product.full_clean()  # Trigger validation

class TestGetProduct(TestCase):
    
    @classmethod
    def setUp(cls):
        cls.client = Client()
        
        chaussure = Product.objects.create(id="1", name="chaussure")
        raquette = Product.objects.create(id="2", name="raquette")

        ProductSports.objects.create(product=chaussure, sport="BADMINTON")
        ProductSports.objects.create(product=raquette, sport="BADMINTON")
        
        ProductLevels.objects.create(product=chaussure, level="BEGINNER")
        ProductLevels.objects.create(product=chaussure, level="AVERAGE")
        ProductLevels.objects.create(product=chaussure, level="EXPERT")
        
        ProductLevels.objects.create(product=raquette, level="AVERAGE")

    def test_get_all_products(self):
        response = self.client.get("/products")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "0.00",
                "card_image": None
            },
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "0.00",
                "card_image": None
            }
        ], json_response)

    def test_adding_product(self):
        volant = Product.objects.create(id="3", name="volant")
        ProductSports.objects.create(product=volant, sport="BADMINTON")
        ProductLevels.objects.create(product=volant, level="BEGINNER")
        
        response = self.client.get("/products")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "0.00",
                "card_image": None
            },
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "0.00",
                "card_image": None
            },
            {
                "id": "3",
                "levels": ["BEGINNER"],
                "sports": ["BADMINTON"],
                "name": "volant",
                "price": "0.00",
                "card_image": None
            }
        ], json_response)

class TestGetFilteredProduct(TestCase):
    @classmethod
    def setUp(cls):
        cls.client = Client()
        
        chaussure = Product.objects.create(id="1", name="chaussure", price=1000)
        raquette = Product.objects.create(id="2", name="raquette", price=50)
        balle = Product.objects.create(id="3", name="balle", price=30)

        ProductSports.objects.create(product=chaussure, sport="BADMINTON") 
        ProductSports.objects.create(product=raquette, sport="BADMINTON")
        ProductSports.objects.create(product=balle, sport="BASKETBALL")

        ProductLevels.objects.create(product=chaussure, level="BEGINNER") 
        ProductLevels.objects.create(product=chaussure, level="AVERAGE") 
        ProductLevels.objects.create(product=chaussure, level="EXPERT")
        ProductLevels.objects.create(product=raquette, level="AVERAGE")
        ProductLevels.objects.create(product=balle, level="AVERAGE")
        ProductLevels.objects.create(product=balle, level="EXPERT")

    def test_get_all_products(self):
        response = self.client.get("/products")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "1000.00",
                "card_image": None
            },
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "50.00",
                "card_image": None
            },
            {
                "id": "3",
                "levels": ["AVERAGE", "EXPERT"],
                "sports": ["BASKETBALL"],
                "name": "balle",
                "price": "30.00",
                "card_image": None
            }
        ], json_response)

    def test_get_all_products_filtered_by_level(self):
        response = self.client.get("/products?level=EXPERT")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "1000.00",
                "card_image": None
            },
            {
                "id": "3",
                "levels": ["AVERAGE", "EXPERT"],
                "sports": ["BASKETBALL"],
                "name": "balle",
                "price": "30.00",
                "card_image": None
            },
        ], json_response)

    def test_get_products_filtered_by_sport(self):
        response = self.client.get("/products?sport=BADMINTON")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "1000.00",
                "card_image": None
            },
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "50.00",
                "card_image": None
            },
        ], json_response)

    def test_get_products_filtered_by_level_and_sport(self):
        response = self.client.get("/products?sport=BADMINTON&level=EXPERT")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "1",
                "levels": ["AVERAGE", "BEGINNER", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure",
                "price": "1000.00",
                "card_image": None
            }
        ], json_response)

    def test_get_products_filtered_by_price(self):
        response = self.client.get("/products?minPrice=10&maxPrice=100")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "50.00",
                "card_image": None
            },
            {
                "id": "3",
                "levels": ["AVERAGE", "EXPERT"],
                "sports": ["BASKETBALL"],
                "name": "balle",
                "price": "30.00",
                "card_image": None
            }
        ], json_response)

    def test_get_products_filtered_by_price_and_sport(self):
        response = self.client.get("/products?minPrice=10&maxPrice=100&sport=Badminton")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "id": "2",
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette",
                "price": "50.00",
                "card_image": None
            },
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
            },
            {
                "key": "BASKET",
                "name": "Basketball"
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