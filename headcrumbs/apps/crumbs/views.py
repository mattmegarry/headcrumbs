from django.views.generic import ListView 
from .models import Crumb
from .serializers import CrumbSerializer
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class CrumbListView(LoginRequiredMixin, ListView):
    model = Crumb
    template_name = 'crumb_list.html'
    context_object_name = 'crumbs'
    login_url = 'login'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user).order_by('-id')


class CrumbAPIViewSet(APIView):

    permission_classes = [IsAuthenticated] 

    def post(self, request):
        serializer = CrumbSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response(serializer.data)
        return Response(serializer.errors)
    
class TrailsListView(LoginRequiredMixin, ListView):
    model = Crumb
    template_name = 'trail_list.html'
    context_object_name = 'trails'
    login_url = 'login'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user).order_by('name')