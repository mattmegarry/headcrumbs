from django.views.generic import ListView 
from .models import Crumb, Trail, TrailCrumb
from .serializers import CrumbSerializer, TrailSerializer
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Max

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
    
class TrailsListView(LoginRequiredMixin, ListView):
    model = Trail
    template_name = 'trail_list.html'
    context_object_name = 'trails'
    login_url = 'login'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user).order_by('name')

class TrailCrumbView(LoginRequiredMixin, ListView):
    model = TrailCrumb
    template_name = 'trailcrumb_list.html'
    context_object_name = 'trail_crumbs'
    login_url = 'login'

    def get_queryset(self):

        return self.model.objects.filter(trail__slug=self.kwargs['trail_slug'], user=self.request.user).order_by('order')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['trail'] = Trail.objects.get(slug=self.kwargs['trail_slug'], user=self.request.user)
        print(context)
        return context
    
class UnassignedCrumbView(LoginRequiredMixin, ListView):
    model = Crumb
    template_name = 'unassignedcrumb_list.html'
    context_object_name = 'crumbs'
    login_url = 'login'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user).exclude(trailcrumb__user=self.request.user).order_by('-id')

class CrumbAPIViewSet(APIView):

    permission_classes = [IsAuthenticated] 

    def post(self, request):
        serializer = CrumbSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response(serializer.data)
        return Response(serializer.errors)
    
class TrailAPIViewSet(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        trails = Trail.objects.filter(user=request.user)
        serializer = TrailSerializer(trails, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TrailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

class TrailCrumbAPIViewSet(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        trail = Trail.objects.get(slug=request.data['slug'], user=request.user)
        crumb = Crumb.objects.get(id=request.data['crumbId'], user=request.user)
        max_order = TrailCrumb.objects.filter(trail=trail).aggregate(Max('order'))['order__max']

        if max_order is None:  
            new_order = 1
        else:
            new_order = max_order + 1
    
        trail_crumb = TrailCrumb.objects.create(
            trail=trail, 
            crumb=crumb, 
            user=request.user,
            order=new_order  
        )

        trail_crumb.save()
        return Response({'status': 'success'})
        