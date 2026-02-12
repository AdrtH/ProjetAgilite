from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from equipements.models import Product, Sport,User
from ninja import NinjaAPI,Schema
from django.contrib.auth.hashers import check_password
import json
api = NinjaAPI()

class UserInput(Schema):
    name :str
    password:str
    sport:str
    niveauSportif:str

class LoginInput(Schema):
    name :str
    password:str

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

