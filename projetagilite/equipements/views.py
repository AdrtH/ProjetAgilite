from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product, Sport,User
from ninja import NinjaAPI,Schema

api = NinjaAPI()

class UserInput(Schema):
    name :str
    password:str
    sport:str
    niveauSportif:str

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

@api.post("/register")
def post_register(request,payload:UserInput):

    known_user= User.objects.all()
    for i in known_user:
        if payload.name==i.username:
            return JsonResponse({'error': 'Utilisateur existant'}, status=400)
    nouvel_user = User.objects.create(username=payload.name,sportsPratique=payload.sport,niveauSportif=payload.niveauSportif,password=payload.password)
    return 'success'

