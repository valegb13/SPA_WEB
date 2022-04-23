from django.db import models
from api.models import User


class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128, blank=False)
    price = models.FloatField(blank=False)


class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    date = models.DateField()
