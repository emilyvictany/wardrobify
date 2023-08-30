from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    number = models.PositiveSmallIntegerField(default=None)
    closet_name = models.CharField(max_length=200, default=None)
    bin_size = models.PositiveSmallIntegerField(default=None)

class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("shoe_details", kwargs={"pk": self.pk})
