from django.db import models
from django.urls import reverse


# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveSmallIntegerField(default=0)
    shelf_number = models.PositiveSmallIntegerField(default=0)

    def get_api_url(self):
        return reverse("api_location", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    class Meta:
        ordering = ("closet_name", "section_number", "shelf_number")


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("hat_details", kwargs={"id": self.id})
