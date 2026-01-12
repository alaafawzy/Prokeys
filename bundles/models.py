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


class Metadata(models.Model):
    
    english_page_title_for_metadata = models.CharField(max_length=255,default="Bundles",
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    
    def __str__(self):
        return self.english_page_title_for_metadata


class DescriptionSection(models.Model):
    english_title = models.CharField(max_length=255, default='Our Accounting Bundles')
    arabic_title = models.CharField(max_length=255, default='باقاتنا المحاسبية')
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.ImageField(upload_to='bundles/', blank=True, null=True)
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True, default='Professional')
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Description Sections"
    
    def __str__(self):
        return "Bundles Description Section"