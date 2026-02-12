from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product, Sport,User
from ninja import NinjaAPI,Schema
from django.contrib.auth.hashers import check_password
import json
from typing import Optional

api = NinjaAPI()

class UserInput(Schema):
    name :str
    password:str
    sport:str
    niveauSportif:str

class LoginInput(Schema):
    name :str
    password:str

class UserEdit(Schema):
    name: Optional[str] = None
    sport: Optional[str] = None
    level: Optional[str] = None

def product_to_response(product):
    return {
        "id": product.id,
        "sports": list(product.sports.values_list("sport", flat=True)),
        "levels": list(product.levels.values_list("level", flat=True)),
        "name": product.name,
        "price": product.price,
        "card_image": product.card_image,
        "stock_count": product.stock_count,
    }

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
        product_to_response(product)
        for product in products
    ]
    return JsonResponse(result, safe=False)

@api.get("/products/:product_id")
def get_product_by_id(request, product_id):
    product = Product.objects.filter(id=product_id).first()
    if product is None:
        return JsonResponse({"error": "Could not find product"}, status=404)
    return JsonResponse(product_to_response(product))

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
    nouvel_user = User.objects.create(username=payload.name,sportsPratique=payload.sport,niveauSportif=payload.niveauSportif)
    nouvel_user.set_password(payload.password)
    nouvel_user.save()
    return 'success'

@api.post("/login")
def login(request,payload:LoginInput):
    known_user=User.objects.all()
    for i in known_user:
        if payload.name==i.username:
            if(check_password(payload.password,i.password)):
                return JsonResponse({'bravo : ' : i.id},status=200)
            else:return JsonResponse({'error : ' :'utilisateurs ou mot de passe non valide'},status=400)
    return JsonResponse({'error : ' : 'utilisateurs ou mot de passe non valide'},status=400)

@api.get("/user/:name")
def get_user(request, name: str):
    u = User.objects.filter(username=name).first()
    if u is None:
        return JsonResponse({"error": "Utilisateur non existant"}, status=404)
    return JsonResponse({
        "id": u.id,
        "name": u.username,
        "sport": u.sportsPratique,
        "level": u.niveauSportif
    }, status=200)

@api.put("/user/:name")
def put_user(request, name: str, payload: UserEdit):
    u = User.objects.filter(username=name)
    if not u:
        return JsonResponse({"error": "Utilisateur non existant"}, status=404)
    
    modifications = dict()
    if payload.name:
        modifications |= {"username": payload.name}
    if payload.sport:
        modifications |= {"sportsPratique": payload.sport}
    if payload.level:
        modifications |= {"niveauSportif": payload.level}
        
    u.update(**modifications)
    return "Success"
