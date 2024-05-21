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
from django.conf import settings
from django.conf.urls.static import static
from usuario.views import register_user, login, list_users
from categoriaCultivo.views import CategoriaUpdateDelete, categoriaList
from cultivos.views import CultivoUpdateDelete, cultivoList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1', include('perfil.urls')),
    path('register/', register_user, name='register'),
    path('login/', login, name='login'),
    path('cultivos/', include('cultivos.urls')),
    path('Aplicacion_web/', include('Aplicacion_web.urls')),
    path('users/', list_users, name='list_users'),

    path('api/', include('categoriaCultivo.urls')),
    path('api/categoriaCultivo/<pk>/', categoriaList),
    path('api/categoriaCultivo/update/<pk>/', categoriaList),
    path('api/categoriaCultivo/', categoriaList),
    path('api/categoriaCultivo/detail/<pk>/', categoriaList),

    path('api/', include('cultivos.urls')),
    path('api/cultivos/<pk>/', cultivoList),
    path('api/cultivos/update/<pk>/', cultivoList),
    path('api/cultivos/', cultivoList),
    path('api/cultivos/detail/<pk>/', cultivoList)
]

# para que cargue la foto
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)