from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style",
        "picture_url",
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "style",
        "color",
        "fabric",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_hats_list(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location href"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_hat_detail(request, id):
    if request.method == "GET":
        try:
            location = Hat.objects.get(id=id)
            print(location)
            return JsonResponse(
                location,
                encoder=HatDetailEncoder,
                safe=False
            )
        except LocationVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = Hat.objects.get(id=id)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatDetailEncoder,
                safe=False
            )
        except LocationVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            location = Hat.objects.get(id=id)

            props = ["closet_name"]
            for prop in props:
                if prop in content:
                    setattr(location, prop, content[prop])
            location.save()
            return JsonResponse(
                location,
                encoder=HatDetailEncoder,
                safe=False
            )
        except LocationVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
