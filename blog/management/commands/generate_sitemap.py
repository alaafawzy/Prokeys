"""
Django management command: generate_sitemap
Usage:
    python manage.py generate_sitemap
    python manage.py generate_sitemap --output /var/www/html/sitemap.xml

ALL page slugs (about, services, blogs, contact, faq, bundles) are read
from the PagePath model in the DB.  Service and blog detail slugs come from
their own models.  Nothing is hardcoded — changing a path in the admin panel
will be reflected in the next sitemap run automatically.

Writes a fresh sitemap.xml to BASE_DIR (project root) by default.
"""

import os
from datetime import date

from django.conf import settings
from django.core.management.base import BaseCommand

from blog.models import Blog
from services.models import Service
from portal.models import PagePath

# ---------------------------------------------------------------------------
# Site configuration
# ---------------------------------------------------------------------------
SITE_DOMAIN = "https://www.111prokeys.com"

# Fallback paths used when a key has no DB entry or its path field is empty.
# These match the frontend defaults in pagePaths.js.
DEFAULTS = {
    "en": {
        "about":    "aboutus",
        "faq":      "faq",
        "bundles":  "bundles",
        "services": "services",
        "contact":  "contactus",
        "blogs":    "blogs",
    },
    "ar": {
        "about":    "من-نحن",
        "faq":      "الأسئلة-الشائعة",
        "bundles":  "الباقات",
        "services": "الخدمات",
        "contact":  "اتصل-بنا",
        "blogs":    "المدونة",
    },
}

# SEO settings per page key
PAGE_META = {
    # key         changefreq   priority
    "home":      ("daily",    "1.0"),
    "about":     ("monthly",  "0.8"),
    "services":  ("weekly",   "0.9"),
    "bundles":   ("weekly",   "0.8"),
    "blogs":     ("weekly",   "0.8"),
    "faq":       ("monthly",  "0.6"),
    "contact":   ("monthly",  "0.5"),
}


def _load_page_paths() -> dict:
    """
    Read PagePath rows from the DB and return a dict:
        { "en": { key: path, … }, "ar": { key: path, … } }
    Falls back to DEFAULTS for any missing key or empty path.
    """
    paths = {"en": dict(DEFAULTS["en"]), "ar": dict(DEFAULTS["ar"])}

    for pp in PagePath.objects.all():
        key = pp.key
        if pp.english_path:
            paths["en"][key] = pp.english_path
        if pp.arabic_path:
            paths["ar"][key] = pp.arabic_path

    return paths


def _url_pair(en_loc: str, ar_loc: str, lastmod: str, changefreq: str, priority: str) -> list:
    """Return two <url> blocks — one English <loc>, one Arabic <loc>."""
    en_url = f"{SITE_DOMAIN}/{en_loc}/"
    ar_url = f"{SITE_DOMAIN}/{ar_loc}/"

    template = (
        "  <url>\n"
        "    <loc>{loc}</loc>\n"
        "    <lastmod>{lastmod}</lastmod>\n"
        "    <changefreq>{changefreq}</changefreq>\n"
        "    <priority>{priority}</priority>\n"
        '    <xhtml:link rel="alternate" hreflang="en" href="{en_url}"/>\n'
        '    <xhtml:link rel="alternate" hreflang="ar" href="{ar_url}"/>\n'
        '    <xhtml:link rel="alternate" hreflang="x-default" href="{en_url}"/>\n'
        "  </url>"
    )

    en_entry = template.format(loc=en_url, lastmod=lastmod, changefreq=changefreq,
                               priority=priority, en_url=en_url, ar_url=ar_url)
    ar_entry = template.format(loc=ar_url, lastmod=lastmod, changefreq=changefreq,
                               priority=priority, en_url=en_url, ar_url=ar_url)
    return [en_entry, ar_entry]


def build_sitemap_xml() -> str:
    """Build and return the full sitemap XML string from the current DB state."""
    today    = date.today().isoformat()
    db_paths = _load_page_paths()
    url_blocks = []

    # ------------------------------------------------------------------
    # 1. Home page  (always "en" / "ar" — not stored in PagePath)
    # ------------------------------------------------------------------
    url_blocks.extend(_url_pair("en", "ar", today, "daily", "1.0"))

    # ------------------------------------------------------------------
    # 2. Static pages — slugs come entirely from the DB (PagePath model)
    # ------------------------------------------------------------------
    for key, (changefreq, priority) in PAGE_META.items():
        if key == "home":
            continue  # handled above
        en_path = db_paths["en"].get(key, DEFAULTS["en"].get(key, key))
        ar_path = db_paths["ar"].get(key, DEFAULTS["ar"].get(key, key))
        url_blocks.extend(_url_pair(f"en/{en_path}", f"ar/{ar_path}",
                                    today, changefreq, priority))

    # ------------------------------------------------------------------
    # 3. Service detail pages — list path from DB, detail slug from Service model
    # ------------------------------------------------------------------
    en_services_base = db_paths["en"].get("services", DEFAULTS["en"]["services"])
    ar_services_base = db_paths["ar"].get("services", DEFAULTS["ar"]["services"])

    for service in Service.objects.all():
        en_slug = service.english_slug or ""
        ar_slug = service.arabic_slug or ""
        if not en_slug:
            continue
        en_loc = f"en/{en_services_base}/{en_slug}"
        ar_loc = f"ar/{ar_services_base}/{ar_slug or en_slug}"
        url_blocks.extend(_url_pair(en_loc, ar_loc, today, "monthly", "0.7"))

    # ------------------------------------------------------------------
    # 4. Blog detail pages — list path from DB, detail slug from Blog model
    # ------------------------------------------------------------------
    en_blogs_base = db_paths["en"].get("blogs", DEFAULTS["en"]["blogs"])
    ar_blogs_base = db_paths["ar"].get("blogs", DEFAULTS["ar"]["blogs"])

    for blog in Blog.objects.all():
        en_slug = blog.english_slug or ""
        ar_slug = blog.arabic_slug or ""
        if not en_slug:
            continue
        en_loc = f"en/{en_blogs_base}/{en_slug}"
        ar_loc = f"ar/{ar_blogs_base}/{ar_slug or en_slug}"
        url_blocks.extend(_url_pair(en_loc, ar_loc, today, "monthly", "0.6"))

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset',
        '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        *url_blocks,
        "</urlset>",
    ]
    return "\n".join(lines)


class Command(BaseCommand):
    help = "Generate sitemap.xml from the database and write it to disk."

    def add_arguments(self, parser):
        parser.add_argument(
            "--output",
            default=os.path.join(settings.BASE_DIR, "sitemap.xml"),
            help="Absolute path where sitemap.xml will be written "
                 "(default: <project-root>/sitemap.xml)",
        )

    def handle(self, *args, **options):
        output_path: str = options["output"]

        self.stdout.write("Building sitemap from DB …")
        xml = build_sitemap_xml()

        with open(output_path, "w", encoding="utf-8") as fh:
            fh.write(xml)

        db_paths       = _load_page_paths()
        services_count = Service.objects.filter(english_slug__isnull=False).exclude(english_slug="").count()
        blogs_count    = Blog.objects.filter(english_slug__isnull=False).exclude(english_slug="").count()
        static_count   = len(PAGE_META)  # home + 6 static pages
        total_urls     = static_count * 2 + services_count * 2 + blogs_count * 2

        self.stdout.write(self.style.SUCCESS(
            f"sitemap.xml written to {output_path}\n"
            f"  Page paths source : DB (PagePath model) with fallback to defaults\n"
            f"  Static pages      : {static_count * 2} URLs ({static_count} pages × 2 langs)\n"
            f"  Services          : {services_count * 2} URLs ({services_count} services × 2 langs)\n"
            f"  Blogs             : {blogs_count * 2} URLs ({blogs_count} blogs × 2 langs)\n"
            f"  Total             : {total_urls} URLs"
        ))
