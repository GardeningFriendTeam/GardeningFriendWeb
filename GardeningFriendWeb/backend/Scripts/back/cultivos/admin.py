from django.contrib import admin
from .models import Cultivo

# Register your models here.
class CultivoAdmin(admin.ModelAdmin):
    list =(
        'nombre', 
        # 'usuario', 
        'categoria', 
        'imagen', 
        'descripcion', 
        'region', 
        'estacion_de_siembra', 
        'temperatura_recomendada', 
        'favorito')
    
    admin.site.register(Cultivo)