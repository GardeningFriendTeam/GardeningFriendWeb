from django.contrib import admin
from .models import CategoriaCultivo
# Register your models here.


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    list_display_links = ('nombre',)
    search_fields = ('nombre',)
    list_per_page = 25


admin.site.register(CategoriaCultivo, CategoriaAdmin)