from django.contrib import admin
from .models import Usuario
from .models import Cultivo
from .models import Pedido
from .models import Carrito
from .models import Productos
from .models import Categoria
# Register your models here.
admin.site.register(Usuario)
admin.site.register(Cultivo)
admin.site.register(Pedido)
admin.site.register(Carrito)
admin.site.register(Productos)
admin.site.register(Categoria)