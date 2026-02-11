from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_product, name="products"),
    path('sports/', views.get_sport, name="sports"),
]
