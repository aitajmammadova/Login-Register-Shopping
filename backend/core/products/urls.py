from django.urls import path
from . import views

app_name='products'

urlpatterns = [
    path("prds_list",views.get_prd_view, name="prds_list"),
    path("add_prd",views.prd_add_view, name="add_product")
 
]
