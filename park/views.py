from typing import Dict, Generic
from django.http import HttpRequest
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from api.models import User

from rest_framework import views, authentication, status, generics
from rest_framework.response import Response

from park.serializers import (
    BookingCreateSerializer,
    BookingModelSerializer,
    BookingUpdateSerializer,
    TicketModelSerializer,
    UserModelSerializer,
    TicketUpdateSerializer,
)
from park.models import Ticket, Booking


class UserDetailView(views.APIView):
    def get(self, request: HttpRequest, format=None):
        if request.user.is_authenticated:
            queryset = User.objects.filter(username=request.user.username)
            if queryset.exists():
                data = UserModelSerializer(queryset[0]).data
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TicketListView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketModelSerializer


class TicketCreateView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            data = TicketModelSerializer(request.data).data
            newTicket = Ticket(
                name=data.get("name", None), price=data.get("price", None)
            )
            newTicket.save()
            return Response(
                {"OK": "Ticket created"},
                status=status.HTTP_201_CREATED,
            )
        return Response(status=status.HTTP_403_FORBIDDEN)


class TicketUpdateView(views.APIView):
    def put(self, request: HttpRequest, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            updateData = TicketUpdateSerializer(request.data).data
            ticket: Ticket = Ticket.objects.get(id=updateData.get("id", None))
            if ticket.name != updateData.get("name"):
                ticket.name = updateData.get("name")
            if ticket.price != updateData.get("price"):
                ticket.price = updateData.get("price")
            ticket.save()
            return Response({"OK": "Ticket updated"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class TicketDeleteView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        ticket = Ticket.objects.filter(id=request.data.get("id", None))
        if (
            request.user.is_authenticated
            and request.user.is_superuser
            and ticket.exists()
        ):
            ticket[0].delete()
            return Response({"OK": "Ticket Deleted"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class BookingListView(views.APIView):
    def get(self, request: HttpRequest, format=None):
        if request.user.is_authenticated:
            queryset = Booking.objects.filter(user=request.user)
            data = {
                "bookings": [
                    BookingModelSerializer(booking).data for booking in queryset
                ]
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class BookingCreateView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        if request.user.is_authenticated:
            serializer_class = BookingCreateSerializer(data=request.data)
            if serializer_class.is_valid():
                data: Dict = serializer_class.data
                user: User = User.objects.get(username=request.user.username)
                ticket = Ticket.objects.get(id=data.get("ticket"))

                newBooking = Booking(user=user, ticket=ticket, date=data.get("date"))
                newBooking.save()

                return Response({"OK": "Ticket Booked"}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class BookingUpdateView(views.APIView):
    def put(self, request: HttpRequest, format=None):
        serializer_class = BookingUpdateSerializer(data=request.data)
        if request.user.is_authenticated and serializer_class.is_valid():
            updateData = serializer_class.data
            print(updateData)
            booking: Booking = Booking.objects.get(id=updateData.get("id", None))
            if booking.date != updateData.get("date"):
                booking.date = updateData.get("date")
            if booking.ticket != updateData.get("ticket"):
                booking.ticket = Ticket.objects.get(id=updateData.get("ticket"))
            booking.save()
            return Response({"OK": "Booking updated"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class BookingDeleteView(views.APIView):
    def post(self, request: HttpRequest, format=None):
        booking = Booking.objects.filter(id=request.data.get("id", None))
        if booking.exists() and booking[0].user.id == request.user.id:
            booking[0].delete()
            return Response({"OK": "Booking Deleted"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
