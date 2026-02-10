from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product

# Create your views here.
@require_GET
def get_product(_request):
    products = Product.objects.all()
    result = [
        {
            "sports": list(product.sports.values_list("sport", flat=True)),
            "levels": list(product.levels.values_list("level", flat=True)),
            "name": product.name
        }
        for product in products
    ]
    return JsonResponse(result, safe=False)

