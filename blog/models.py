from django.db import models
from ckeditor.fields import RichTextField
from django.utils.text import slugify
import re
import os
from django.core.validators import FileExtensionValidator
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
class Blog(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.FileField(upload_to=attachment, blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    english_content = RichTextField(null=True,blank=True)
    arabic_content = RichTextField(null=True,blank=True)

    def __str__(self):
        return f"{self.english_title}"