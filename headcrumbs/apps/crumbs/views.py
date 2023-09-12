from django.views.generic import ListView 
from .models import Crumb
from django.contrib.auth.mixins import LoginRequiredMixin

class CrumbListView(LoginRequiredMixin, ListView):
    model = Crumb
    template_name = 'crumb_list.html'
    context_object_name = 'crumbs'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)
    
