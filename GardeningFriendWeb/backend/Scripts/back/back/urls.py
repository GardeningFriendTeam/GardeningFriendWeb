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
from usuario.views import register_user, login, list_users, update_user, delete_user, update_user_role
from categoriaCultivo.views import CategoriaUpdateDelete, categoriaList
from cultivos.views import CultivoUpdateDelete, cultivoList
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="API Documentation",
      default_version='v1',
      description="API documentation for your project",
      terms_of_service="https://www.example.com/policies/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
)

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
    

    path('api/', include('categoriaCultivo.urls')),
    path('api/categoriaCultivo/<pk>/', categoriaList),
    path('api/categoriaCultivo/update/<pk>/', categoriaList),
    path('api/categoriaCultivo/', categoriaList),
    path('api/categoriaCultivo/detail/<pk>/', categoriaList),

    path('api/', include('cultivos.urls')),
    path('api/cultivos/<pk>/', cultivoList),
    path('api/cultivos/update/<pk>/', cultivoList),
    path('api/cultivos/', cultivoList),
    path('api/cultivos/detail/<pk>/', cultivoList),

       # Swagger URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# para que cargue la foto
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)