import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
from shoes_rest.models import BinVO


def get_bins():
    url = "http://wardrobe-api:8000/api/bins/"
    response = requests.get(url)
    # print("THIS IS THE RESPONSE: ", response)
    content = json.loads(response.content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href = bin["href"],
            defaults={
            "bin_size" : bin["bin_size"],
            "number" : bin["bin_number"],
            "closet_name" : bin["closet_name"]
            }
        )

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
