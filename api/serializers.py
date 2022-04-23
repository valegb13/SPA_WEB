from api.models import User
from rest_framework import fields, serializers


class UserModelSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(
        format="%Y-%m-%d", input_formats=["%y-%m-%d", "iso-8601"]
    )

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "username",
            "email",
            "birthday",
            "phone",
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(
        format="%Y-%m-%d", input_formats=["%y-%m-%d", "iso-8601"]
    )

    class Meta:
        model = User
        fields = ("first_name", "last_name", "birthday", "phone")
