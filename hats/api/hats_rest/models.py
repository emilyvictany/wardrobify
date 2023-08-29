from django.db import models
from django.urls import reverse


# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picUrl = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )
