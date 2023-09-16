from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Crumb(models.Model):
    text = models.TextField()
    url = models.URLField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.text[:50]}'

class Trail(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            ('name', 'user'),
            ('slug', 'user')
        )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'

class TrailCrumb(models.Model):
    trail = models.ForeignKey(Trail, on_delete=models.CASCADE)
    crumb = models.ForeignKey(Crumb, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ['trail', 'order']