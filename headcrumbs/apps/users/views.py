from django.contrib.auth.views import LoginView
from django.contrib.auth import logout 
from django.views import View
from django.urls import reverse
from django.shortcuts import redirect

class LoginView(LoginView):
    redirect_authenticated_user = True
    
    def get_success_url(self):
        return reverse('crumbs')
    
class LogoutView(View):
    
    def get(self, request):
        logout(request)
        return redirect('home')
