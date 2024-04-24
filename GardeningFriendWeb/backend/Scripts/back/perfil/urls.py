from django.urls import path, include
from rest_framework import routers
#from Aula.views import AulaViewSet
from perfil import views

router= routers.DefaultRouter()
router.register(r'perfil',views.PerfilViewSet)
#----
urlpatterns = [
     path('', include(router.urls)),
]