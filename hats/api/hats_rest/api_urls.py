from django.urls import path
from .views import api_hats_list, api_hat_detail


urlpatterns = [
    path("hats/", api_hats_list, name="api_hats_list"),
    path("hats/<int:id>/", api_hat_detail, name="api_hat_detail")
]
