from django.urls import path
from . import views

urlpatterns =  [
    path('registro', views.CreateUserView.as_view(), name='registro'),
    path('login', views.LoginView.as_view(), name='login')
]