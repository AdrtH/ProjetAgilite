from django.contrib import admin

from equipements.models import SportModel, User

# Register your models here.
admin.site.register(User)
admin.site.register(SportModel)
