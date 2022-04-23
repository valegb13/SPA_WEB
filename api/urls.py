from django.urls import path
from api import views

urlpatterns = [
    path("auth/login", views.userLoginView.as_view(), name="userLogin"),
    path("auth/logout", views.userLogoutView.as_view(), name="userLogout"),
    path("auth/create", views.userCreateView.as_view(), name="userCreate"),
    path("auth/update", views.UserUpdateView.as_view(), name="userUpdate"),
    path("auth/delete", views.UserDeleteView.as_view(), name="userDelete"),
]
