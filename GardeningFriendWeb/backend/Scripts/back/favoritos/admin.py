from django.contrib import admin
from .models import Cultivo, FavoritoCultivo

# Register your models here.


# Registro de modelos en el panel de administración
@admin.register(Cultivo)
class CultivoAdmin(admin.ModelAdmin):
    list_display = ('nombre',)  # Campos que se mostrarán en la lista de cultivos en el panel de administración

@admin.register(FavoritoCultivo)
class FavoritoCultivoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'cultivo_favorito')  # Campos que se mostrarán en la lista de favoritos de cultivos en el panel de administración