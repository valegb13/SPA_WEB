from django.http import HttpRequest
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout

from rest_framework import views, authentication, status, generics
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from api.serializers import UserModelSerializer, UserUpdateSerializer
from api.models import User


class userLoginView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class userLogoutView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class userCreateView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        username = request.data.get("username")
        email = request.data.get("email", None)

        print(username)

        nonUniqueEmail = User.objects.filter(email=email).exists()
        nonUniqueUsername = User.objects.filter(username=username).exists()

        if nonUniqueEmail or nonUniqueUsername:
            data = {
                "username": username,
                "email": email,
                "phone": request.data.get("phone", None),
                "birthday": request.data.get("birthday", None),
                "error": "Email or Username already in use.",
            }
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        else:
            User.objects.create_user(
                email=email,
                username=username,
                phone=request.data.get("phone", None),
                birthday=request.data.get("birthday", None),
                password=request.data.get("password", None),
            )
            return Response(
                {"OK": "User created"},
                status=status.HTTP_201_CREATED,
            )


class UserUpdateView(views.APIView):
    def put(self, request: HttpRequest, format=None):
        if request.user.is_authenticated:
            user: User = User.objects.get(username=request.user.username)
            userData = UserUpdateSerializer(user).data
            if request.data.get("first_name", None) != userData.get("first_name"):
                user.first_name = request.data.get("first_name", None)
            if request.data.get("last_name", None) != userData.get("last_name"):
                user.last_name = request.data.get("last_name", None)
            if request.data.get("phone", None) != userData.get("phone"):
                user.phone = request.data.get("phone", None)
            if request.data.get("birthday", None) != userData.get("birthday"):
                user.birthday = request.data.get("birthday", None)
            user.save()

            return Response({"OK": "User updated"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserDeleteView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        if request.user.is_authenticated:
            user: User = User.objects.get(username=request.user.username)
            user.delete()
            return Response({"OK": "User Deleted"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
