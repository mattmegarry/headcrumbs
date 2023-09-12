from django.db import models
from django.conf import settings

class Crumb(models.Model):
    text = models.TextField()
    url = models.URLField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
