from django.urls import path
from .views import eliminar_cultivo_favorito

urlpatterns = [
    path('eliminar-favorito/', eliminar_cultivo_favorito, name='eliminar_favorito'),
]