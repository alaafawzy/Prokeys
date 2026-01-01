
from django.db import models
from ckeditor.fields import RichTextField

class Service(models.Model):
	english_title = models.CharField(max_length=255)
	arabic_title = models.CharField(max_length=255)
	english_description = models.TextField()
	arabic_description = models.TextField()

	def __str__(self):
		return self.english_title

class ServiceSection(models.Model):
    service = models.ForeignKey(Service, related_name='sections', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='service_sections/', blank=True, null=True)
    image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_content = RichTextField(null=True, blank=True)
    arabic_content = RichTextField(null=True, blank=True)

    def __str__(self):
        return f"Section of {self.service.english_title}"

class SingleServiceMetaTag(models.Model):
    ATTRIBUTE_TYPE_CHOICES = (
        ('name', 'Name'),
        ('property', 'Property'),
    )
    attribute_type = models.CharField(max_length=10, choices=ATTRIBUTE_TYPE_CHOICES,
                                      help_text="Choose between 'name' or 'property' attribute",default='name')
    meta_name = models.CharField(max_length=255,
                                 help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')")
    meta_content = models.TextField(
                                    help_text="Meta tag content/value")
    page = models.ForeignKey('SingleServiceMetadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class SingleServiceMetadata(models.Model):
    service = models.ForeignKey(Service, related_name='metadata', on_delete=models.CASCADE,
                             help_text="The service this metadata belongs to")
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title
    
class ServicesPageMetaTag(models.Model):
    ATTRIBUTE_TYPE_CHOICES = (
        ('name', 'Name'),
        ('property', 'Property'),
    )
    attribute_type = models.CharField(max_length=10, choices=ATTRIBUTE_TYPE_CHOICES,
                                      help_text="Choose between 'name' or 'property' attribute",default='name')
    meta_name = models.CharField(max_length=255,
                                 help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')")
    meta_content = models.TextField(
                                    help_text="Meta tag content/value")
    page = models.ForeignKey('ServicesPageMetadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class ServicesPageMetadata(models.Model):
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title


class ServicesDescriptionSection(models.Model):
    english_title = models.CharField(max_length=255, default='Our Services')
    arabic_title = models.CharField(max_length=255, default='خدماتنا')
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    image_alt_text = models.CharField(max_length=255, blank=True, null=True, default='Professional')
    
    class Meta:
        verbose_name_plural = "Description Sections"
    
    def __str__(self):
        return "Services Description Section"