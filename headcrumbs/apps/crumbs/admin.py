from django.contrib import admin
from .models import Crumb, Trail, TrailCrumb

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

class TrailAdmin(admin.ModelAdmin):
    model = Trail
    list_display = ('name', 'slug', 'user')
    list_filter = ('user',)

class TrailCrumbAdmin(admin.ModelAdmin):
    model = TrailCrumb
    list_display = ('trail', 'crumb', 'order', 'user')
    list_filter = ('user',)
    ordering = ('trail', 'order')


admin.site.register(Crumb, CrumbAdmin)
admin.site.register(Trail, TrailAdmin)
admin.site.register(TrailCrumb, TrailCrumbAdmin)