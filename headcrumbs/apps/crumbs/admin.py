from django.contrib import admin
from .models import Crumb

class CrumbAdmin(admin.ModelAdmin):
    model = Crumb
    list_display = ('text_truncated', 'url_truncated', 'user')
    list_filter = ('user',)

    def text_truncated(self, obj):
        return obj.text[:100]
    text_truncated.short_description = 'Text'
    
    def url_truncated(self, obj):
        return obj.url[:50]
    url_truncated.short_description = 'URL'

admin.site.register(Crumb, CrumbAdmin)