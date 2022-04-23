from park import views
from django.urls import path

urlpatterns = [
    path("user", views.UserDetailView.as_view(), name="userDetail"),
    path("tickets", views.TicketListView.as_view(), name="ticketList"),
    path("tickets/create", views.TicketCreateView.as_view(), name="ticketCreate"),
    path("tickets/update", views.TicketUpdateView.as_view(), name="ticketUpdate"),
    path("tickets/delete", views.TicketDeleteView.as_view(), name="ticketDelete"),
    path("book", views.BookingListView.as_view(), name="bookList"),
    path("book/create", views.BookingCreateView.as_view(), name="bookCreate"),
    path("book/update", views.BookingUpdateView.as_view(), name="bookUpdate"),
    path("book/delete", views.BookingDeleteView.as_view(), name="bookDelete"),
]
