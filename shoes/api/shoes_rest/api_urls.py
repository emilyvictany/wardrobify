from django.urls import path

from .views import api_list_shoes, api_shoe_detail

urlpatterns = [
    path("bins/<int:bin_vo_id>/shoes/", api_list_shoes, name="list_shoes"),
    path("shoes/", api_list_shoes, name="create_shoes"),
    path("shoes/<int:pk>/", api_shoe_detail, name="shoe_details")
]
