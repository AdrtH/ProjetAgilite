from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product, Sport
from ninja import NinjaAPI

api = NinjaAPI()

# Create your views here.
@api.get("/products")
def get_product(request, sport:str = None, level:str = None, minPrice:int = None, maxPrice:int = None):
    products = Product.objects.all()

    # Filtrage
    if sport != None:
        products = products.filter(sports__sport__icontains=sport)
    if level != None:
        products = products.filter(levels__level__icontains=level)
    if minPrice != None:
        products = products.filter(price__gte = minPrice)
    if maxPrice != None:
        products = products.filter(price__lte = maxPrice)

    result = [
        {
            "id": product.id,
            "sports": list(product.sports.values_list("sport", flat=True)),
            "levels": list(product.levels.values_list("level", flat=True)),
            "name": product.name,
            "price": product.price,
            "image": product.image,
        }
        for product in products
    ]
    return JsonResponse(result, safe=False)

#Récupère tous les sports
@api.get("/sports")
def get_sport(request):
    result = [
        {
            "key": sport[0],
            "name": sport[1]
        }
        for sport in Sport.choices
    ]
    return JsonResponse(result, safe=False)