from django.test import TestCase, Client
from django.urls import reverse
from equipements.models import Product, SportLevelProductRelation, SportProductRelation, SportLevel, Sport
from equipements.views import get_product
import json
from django.contrib.auth import get_user_model

# Create your tests here.
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
        response = self.client.get("/products/")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "levels": ["BEGINNER", "AVERAGE", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure"
            },
            {
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette"
            }
        ], json_response)

    def test_adding_product(self):
        volant = Product.objects.create(name="volant")
        SportProductRelation.objects.create(product=volant, sport="BADMINTON")
        SportLevelProductRelation.objects.create(product=volant, level="BEGINNER")
        
        response = self.client.get("/products/")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual([
            {
                "levels": ["BEGINNER", "AVERAGE", "EXPERT"],
                "sports": ["BADMINTON"],
                "name": "chaussure"
            },
            {
                "levels": ["AVERAGE"],
                "sports": ["BADMINTON"],
                "name": "raquette"
            },
            {
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


