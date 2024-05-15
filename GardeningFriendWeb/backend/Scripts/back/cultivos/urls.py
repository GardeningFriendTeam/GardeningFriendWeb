from django.urls import path, include
from .views import CultivoViewSet
from rest_framework.routers import DefaultRouter # type: ignore
from cultivos import views

router = DefaultRouter()
router.register(r'cultivos', views.CultivoViewSet, basename='cultivos')
urlpatterns = [
    path('', include(router.urls)),
]