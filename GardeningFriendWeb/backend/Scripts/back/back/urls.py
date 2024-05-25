"""
URL configuration for back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from usuario.views import register_user, login, list_users, update_user, delete_user, update_user_role

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register_user, name='register'),
    path('login/', login, name='login'),
    path('cultivos/', include('cultivos.urls')),
    path('Aplicacion_web/', include('Aplicacion_web.urls')),
    path('users/', list_users, name='list_users'),
    path('users/<int:user_id>/', update_user, name='update_user'),
    path('users/<int:user_id>/update-role/', update_user_role, name='update_user_role'),
    path('users/delete/<int:user_id>/', delete_user, name='delete_user'),
    path('api/', include('favoritos.urls')),
    
]

