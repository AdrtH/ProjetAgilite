from django.test import TestCase
from equipements.models import Product, Sport, SportsOfProduct

# Create your tests here.
class ProductTest(TestCase):
    def setUp(self):
        produit = Product.objects.create(name="Produit AAAA")
        SportsOfProduct.objects.create(product=produit, sport_name=Sport.BADMINTON)

    def test_product(self):
        produits = SportsOfProduct.objects.get(product__name="Produit AAAA")
        print(produits.product.name, produits.sport_name)