from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator
from django.utils.text import slugify
import re
import os
from authentication.models import CustomUser
from ckeditor.fields import RichTextField
from tinymce.models import HTMLField

# Create your models here.
def attachment(instance, filename):
    base_name, ext = os.path.splitext(filename)
    base_name = sanitize_file_name(base_name)
    return 'news/{}/{}{}'.format(instance.id, base_name, ext)

def sanitize_file_name(filename):
    # Remove all non-alphanumeric characters from the filename
    filename = re.sub(r'[^\w\s-]', '', filename)

    # Replace whitespace with hyphens
    filename = filename.strip().replace(' ', '-')

    # Use Django's slugify function to convert the filename to a URL-safe string
    filename = slugify(filename)

    return filename

class New(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    img = models.FileField(upload_to=attachment, blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    def __str__(self):
        return f"{self.name}"

class FAQ(models.Model):
    english_question = models.CharField(max_length=350)
    english_answer = models.CharField(max_length=5000)
    arabic_question = models.CharField(max_length=350)
    arabic_answer = models.CharField(max_length=5000)

    def __str__(self):
        return f"{self.english_question}"

class Bundle(models.Model):
    english_name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200)
    def __str__(self):
        return self.english_name

class Advantage(models.Model):
    bundle = models.ForeignKey(Bundle, related_name='advantages', on_delete=models.CASCADE)
    english_advantage = models.CharField(max_length=500)
    arabic_advantage = models.CharField(max_length=500)

    def __str__(self):
        return self.english_advantage
    
class Footer(models.Model):
    english_address=models.CharField(max_length=255)
    arabic_address=models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

class Comment(models.Model):
    user=models.ForeignKey(CustomUser,related_name='comments',on_delete=models.CASCADE)
    role = models.CharField(max_length=255,blank=True)
    description=models.TextField()

class AboutUs(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = models.TextField()
    arabic_description = models.TextField()
    content = RichTextField(null=True,blank=True)
    # content2 = HTMLField(null=True,blank=True)
    

class HomeStarting(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    arabic_subtitle = models.CharField(max_length=400)
    english_subtitle = models.CharField(max_length=400)
    english_description = models.TextField()
    arabic_description = models.TextField()

class AboutSection(models.Model):
    Name = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_title = models.CharField(max_length=255)
    arabic_subtitle = models.CharField(max_length=400,blank=True,null=True)
    english_subtitle = models.CharField(max_length=400,blank=True,null=True)
    arabic_description = models.TextField()
    english_description = models.TextField()
    english_content = RichTextField()
    arabic_content = RichTextField()
    section_image = models.FileField(upload_to='about_section', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    
    def __str__(self):
        return f"{self.Name}"
class AboutSectionList(models.Model):
    aboutSection = models.ForeignKey(AboutSection, related_name='AboutSection', on_delete=models.CASCADE)
    english_advantage = models.CharField(max_length=500)
    arabic_advantage = models.CharField(max_length=500)

    def __str__(self):
        return self.english_advantage