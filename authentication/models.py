from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.conf import settings
from PIL import Image
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
def validate_image(value):
    # return True
    try:
        img = Image.open(value)
        img.verify()
    except (IOError, SyntaxError) as e:
        raise ValidationError('Uploaded file is not a valid image.')
class UserManager(BaseUserManager):
    def create_user(self, email, password,first_name,last_name,tax_record,phone, **extra_fields):
        """
        Creates and saves a User with the given email, password and extra fields.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')
        if not phone and not extra_fields.get('is_superuser', False):
            raise ValueError('Users must have a Tax record')
        if not tax_record and not extra_fields.get('is_superuser', False):
            raise ValueError('Users must have a Tax record')
        user = self.model(email=self.normalize_email(email),first_name=first_name,
            last_name=last_name,phone=phone, tax_record=tax_record)
        user.set_password(password)
        user.save(using=self._db)

        send_mail(
            'You have registered',
            'You have registered in 111prokeys.com,\n admin will activate your account soon',
            settings.EMAIL_HOST_USER,
            [user.email,'alaafawzy963@gmail.com'],
            fail_silently=False,
        )

        # Send notification email to admin
        send_mail(
            'New user registration',
            f'A new user has registered: {user.email} \n please go to dashboard to activate the account',
            settings.EMAIL_HOST_USER,
            [settings.BUSINESS_EMAIL,'alaafawzy963@gmail.com'],
            fail_silently=False,
        )


        return user

    def create_superuser(self, email, password,first_name,last_name, **extra_fields):
        """
        Creates and saves a SuperUser with the given email, password and extra fields.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)


        if password is None:
            raise ValueError('Superusers must have a password')

        return self.create_user(email, password, first_name, last_name, tax_record=None,phone=None, **extra_fields)

class CustomUser(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone = models.CharField(max_length=14,blank=True,null=True)
    tax_record = models.ImageField(upload_to='tax_records/',null=True, blank=True,validators=[validate_image])
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password','first_name','last_name']

    objects = UserManager()

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    def __str__(self):
        return f"{self.email}"
    def save(self, *args, **kwargs):
        super(CustomUser, self).save(*args, **kwargs)