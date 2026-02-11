from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product, Sport

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

#Récupère tous les sports
@require_GET
def get_sport(_request):
    result = [
        {
            "key": sport[0],
            "name": sport[1]
        }
        for sport in Sport.choices
    ]
    return JsonResponse(result, safe=False)