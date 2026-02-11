from django.test import TestCase
from django.core.exceptions import ValidationError
from equipements.models import Product

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