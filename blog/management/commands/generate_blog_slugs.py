from django.core.management.base import BaseCommand

from blog.models import Blog


class Command(BaseCommand):
    help = "Generate english_slug and arabic_slug for Blog entries that are missing them."

    def handle(self, *args, **options):
        updated = 0
        total = Blog.objects.count()

        for blog in Blog.objects.all():
            before_en = blog.english_slug
            before_ar = blog.arabic_slug

            # Calling save() will auto-generate slugs if they are missing
            blog.save()

            if blog.english_slug != before_en or blog.arabic_slug != before_ar:
                updated += 1
                self.stdout.write(self.style.SUCCESS(f"Updated slugs for blog id={blog.id}"))

        self.stdout.write(
            self.style.SUCCESS(f"Finished. {updated} of {total} blog entries had slugs generated/updated.")
        )
