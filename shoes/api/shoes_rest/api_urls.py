from django.urls import path

from .views import api_list_shoes

urlpatterns = [
    path("bins/<int:bin_vo_id>/shoes/", api_list_shoes, name="list_shoes"),
    path("shoes/", api_list_shoes, name="create_shoes"),
    path("shoes/<int:bin_vo_id>/", api_list_shoes, name="shoe_details")
]
