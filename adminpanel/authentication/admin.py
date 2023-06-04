from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authentication import models

# Register your models here.
class BookAdmin(UserAdmin):
    #list_display = ('id','email')
    list_filter = ('is_superuser','is_Admin')
    list_display = ('id','is_superuser','username', 'email', 'first_name', 'last_name', 'is_verified','is_Admin')


 
    fieldsets = (
        ("Username and password", {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email',)
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'is_verified','is_Admin'
                )
        }),
        
        ('Additional info', {
            'fields': ( 'Mobile',)
        })
    )
    add_fieldsets = (
        ("Username and password", {
             'fields': ('username', 'password1', 'password2')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email',)
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
               'is_verified','is_Admin'
                )
        }),
       
          ('Additional info', {
            'fields': ( 'Mobile',)
        })
    )



class Predictionsadmin(admin.ModelAdmin):
  
    list_display = ('Predictions_id' ,'Predictions_Result','Predictions_Percentage','username','created_at')


admin.site.register(models.User,BookAdmin)

admin.site.register(models.Predictions,Predictionsadmin)




