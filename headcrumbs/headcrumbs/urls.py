"""
URL configuration for headcrumbs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views

from apps.cms.views import HomePageView
from apps.users.views import LoginView, LogoutView
from apps.crumbs.views import CrumbListView, CrumbAPIViewSet, TrailAPIViewSet, TrailsListView, TrailCrumbView, UnassignedCrumbView, TrailCrumbAPIViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomePageView.as_view(), name='home'),
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset-password/', auth_views.PasswordResetView.as_view(template_name='reset-password.html'), name='password_reset'),
    path('reset-password-sent/', auth_views.PasswordResetDoneView.as_view(template_name='reset-sent.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='reset-confirm.html'), name='password_reset_confirm'),
    path('reset-password-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='reset-done.html'), name='password_reset_complete'),
    path('crumbs/', CrumbListView.as_view(), name='crumbs'),
    path('trails/', TrailsListView.as_view(), name='trails'),
    path('trails/unassigned/', UnassignedCrumbView.as_view(), name='unassigned_crumbs'),
    path('trails/<slug:trail_slug>/', TrailCrumbView.as_view(), name='trail_crumbs'),
    path('api/crumbs/', CrumbAPIViewSet.as_view(), name='crumb-api'),
    path('api/trails/', TrailAPIViewSet.as_view(), name='trail-api'),
    path('api/trailcrumbs/', TrailCrumbAPIViewSet.as_view(), name='trailcrumb-api'),
]
