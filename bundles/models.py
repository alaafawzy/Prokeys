from django.db import models

# Create your models here.
class Bundle(models.Model):
    english_name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)
    discount = models.DecimalField(max_digits=5, decimal_places=0, null=True, blank=True)
    best_seller = models.BooleanField(default=False)
    
    def __str__(self):
        return self.english_name


class Advantage(models.Model):
    bundle = models.ForeignKey(Bundle, related_name='advantages', on_delete=models.CASCADE)
    english_advantage = models.CharField(max_length=500)
    arabic_advantage = models.CharField(max_length=500)

    def __str__(self):
        return self.english_advantage


class MetaTag(models.Model):
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
    page = models.ForeignKey('Metadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class Metadata(models.Model):
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title


class DescriptionSection(models.Model):
    english_title = models.CharField(max_length=255, default='Our Accounting Bundles')
    arabic_title = models.CharField(max_length=255, default='باقاتنا المحاسبية')
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.ImageField(upload_to='bundles/', blank=True, null=True)
    image_alt_text = models.CharField(max_length=255, blank=True, null=True, default='Professional')
    
    class Meta:
        verbose_name_plural = "Description Sections"
    
    def __str__(self):
        return "Bundles Description Section"