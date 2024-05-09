from django.urls import path, include
from rest_framework import routers # type: ignore
from Aplicacion_web import views
# from rest_framework_simplejwt.views import ( # type: ignore
#     TokenObtainPairView,
#     TokenRefreshView,
# )

router= routers.DefaultRouter()
router.register(r'Pedido', views.PedidoViewSet)
router.register(r'Carrito', views.CarritoViewSet)
router.register(r'Productos', views.ProductosViewSet)
router.register(r'Categoria', views.CategoriaViewSet)

urlpatterns = [
    
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',include(router.urls)),

]
