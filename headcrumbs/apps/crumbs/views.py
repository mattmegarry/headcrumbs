from django.shortcuts import render
from .models import Crumb
from django.contrib.auth.decorators import login_required

@login_required
def crumb_list(request):
    crumbs = Crumb.objects.filter(user=request.user)
    return render(request, 'crumb_list.html', {'crumbs': crumbs})
