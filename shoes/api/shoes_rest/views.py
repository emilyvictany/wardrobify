from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoes

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["number", "import_href", "closet_name", "bin_size"]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["manufacturer", "model_name", "color", "picture_url", "bin"]
    encoders = {"bin": BinVOEncoder()}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = ["manufacturer", "model_name", "color", "picture_url", "bin"]
    encoders = {"bin": BinVOEncoder()}

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id == None:
            shoes = Shoes.objects.all()
        else:
            # print("THIS IS BINVO DATA:", BinVO.objects.all())
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes" : shoes},
            encoder=ShoesListEncoder
        )
    else:
        content = json.loads(request.body)
        # print("THIS IS THE CONTENT: ", content)
        try:
            bin_href = content['bin']
            # print("THIS IS THE BIN HREF: ", bin_href, type(bin_href))
            # print("THIS IS BINVO DATA:", BinVO.objects.all())
            bin = BinVO.objects.get(import_href = bin_href)
            # print("THIS IS THE BIN VO: ", bin)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse({"message": "Invalid bin id"}, status = 400)
        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder = ShoeDetailEncoder,
            safe = False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_shoe_detail(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )
    elif request.method =="DELETE":
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    # else:
    #     content = json.loads(request.body)
    #     try:
    #         if "bin" in content:
    #             bin = Shoes.objects.get(id=content["bin"])
    #             content["bin"] = bin
        # except Shoes.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid BinVO href"},
        #         status=400
        #     )
