from django.views.generic import TemplateView
from django.shortcuts import redirect

class HomePageView(TemplateView):
    template_name = "home.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('crumbs')
        return super().get(request, *args, **kwargs)