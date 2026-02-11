from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product
from ninja import NinjaAPI

api = NinjaAPI()

# Create your views here.
@api.get("/products")
def get_product(request):
    products = Product.objects.all()
    result = [
        {
            "id": product.id,
            "sports": list(product.sports.values_list("sport", flat=True)),
            "levels": list(product.levels.values_list("level", flat=True)),
            "name": product.name
        }
        for product in products
    ]
    return JsonResponse(result, safe=False)

