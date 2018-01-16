from django.contrib import admin
from TestModel.models import Publisher,Author,Book,user

# # Register your models here.
admin.site.register([Publisher,Author,Book,user])