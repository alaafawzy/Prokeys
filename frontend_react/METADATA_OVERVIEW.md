# 🎯 Metadata Integration - At a Glance

## The System in 30 Seconds

```
Django Admin
    ↓ (Create metadata & meta tags)
    ↓
Django Backend API
    ↓ (GET /api/app/metadata-by-page/?page=xxx)
    ↓
React Frontend
    ↓ (usePageMetadata hook)
    ↓
Browser DOM
    ↓ (Meta tags injected into <head>)
    ↓
Search Engines & Social Media
    ↓ (Read meta tags for indexing & sharing)
```

---

## One-Liner Integration

```jsx
// In any React page component:
usePageMetadata('portal', 'home');  // That's it! ✅
```

---

## What Gets Created in <head>

```html
<title>Home | ProKeys</title>
<meta data-managed-by="prokeys" name="description" content="...">
<meta data-managed-by="prokeys" property="og:title" content="...">
<meta data-managed-by="prokeys" property="og:image" content="...">
<meta data-managed-by="prokeys" name="twitter:card" content="...">
```

---

## API Endpoints at a Glance

```
📍 Portal
   /api/portal/metadata/
   /api/portal/metadata-by-page/?page=home

📍 About  
   /api/about/metadata/
   /api/about/metadata-by-page/?page=about

📍 Bundles
   /api/bundles/metadata/
   /api/bundles/metadata-by-page/?page=bundles

📍 Blog
   /api/blog/metadata/{blog_id}/
   /api/blog/single-metadata/
```

---

## Response Structure

```json
{
  "page_title": "Home | ProKeys",
  "meta_tags": [
    {
      "meta_name": "description",
      "meta_content": "Your page description",
      "attribute_type": "name",
      "is_active": true
    },
    {
      "meta_name": "og:title",
      "meta_content": "ProKeys - Home",
      "attribute_type": "property",
      "is_active": true
    }
  ]
}
```

---

## Implementation Checklist

| Component | Status |
|-----------|--------|
| Backend Models | ✅ |
| Django Serializers | ✅ |
| Django Views | ✅ |
| Django Admin | ✅ |
| API Endpoints | ✅ |
| React Service | ✅ |
| React Hooks | ✅ |
| Page Integration | ✅ |
| Documentation | ✅ |
| Testing | ✅ |

---

## Pages with Metadata

```
✅ Home              (/home)
✅ About             (/about)
✅ Bundles           (/bundles)
✅ Blogs             (/blogs)
✅ Blog Details      (/blog/:id)
✅ Contact           (/contact)
✅ Services          (/services)
```

---

## Quick Reference Card

```javascript
// Import
import { usePageMetadata } from '../hooks/useMetadata';

// Use in Component
export default function MyPage() {
  usePageMetadata('app-name', 'page-id');
  return <div>Content</div>;
}

// Available Hooks
usePageMetadata('portal', 'home')      // Fixed page
useBlogMetadata(id)                     // Dynamic page
useMetadataById('app', id)              // By metadata ID

// Service Functions (if needed)
fetchPageMetadata('portal', 'home')
fetchBlogMetadata(blogId)
applyPageMetadata(metadata)
```

---

## File Summary

```
📁 Frontend
├── src/hooks/useMetadata.js           (Custom hooks)
├── src/utils/metadataService.js       (Service functions)
├── src/Pages/Home.jsx                 (Updated)
├── src/Pages/AboutUs.jsx              (Updated)
├── src/Pages/BundlesPage.jsx          (Updated)
├── src/Pages/Blogs.jsx                (Updated)
├── src/Pages/BlogDetails.jsx          (Updated)
├── src/Pages/CountactUs.jsx           (Updated)
└── src/Pages/OurServises.jsx          (Updated)

📁 Backend
├── portal/models.py                   (Models + Admin)
├── bundles/models.py                  (Models + Admin)
├── about/models.py                    (Models + Admin)
└── blog/models.py                     (Models + Admin)

📁 Documentation
├── README_METADATA.md                 (Index)
├── METADATA_QUICK_REFERENCE.md        (Cheat sheet)
├── METADATA_COMPLETE_SUMMARY.md       (Overview)
├── METADATA_INTEGRATION_GUIDE.md      (Full guide)
├── METADATA_EXAMPLES.md               (Code examples)
├── METADATA_IMPLEMENTATION_SUMMARY.md (Technical)
└── ../METADATA_CHECKLIST.md           (Tracking)
```

---

## Admin Panel Access

```
🔐 Django Admin: /admin/
   ├── Portal → Metadata
   ├── About → Metadata
   ├── Bundles → Metadata
   └── Blog → SigngleBlogMetadata
```

---

## Browser DevTools Check

```javascript
// Open F12 Console and paste:

// 1. Count metadata tags
document.querySelectorAll('meta[data-managed-by="prokeys"]').length

// 2. View all tags
Array.from(document.querySelectorAll('meta[data-managed-by="prokeys"]'))
  .forEach(tag => console.log(tag.outerHTML))

// 3. Check title
document.title

// 4. Check specific tag
document.querySelector('meta[name="description"]')?.content
```

---

## Environment Setup

```bash
# .env file
REACT_APP_API_URL=http://localhost:8000/api

# Or for production
REACT_APP_API_URL=https://yourdomain.com/api
```

---

## Starting Points

```
👶 New?      → METADATA_QUICK_REFERENCE.md
📚 Learning? → METADATA_INTEGRATION_GUIDE.md
💻 Coding?   → METADATA_EXAMPLES.md
🔧 Fixing?   → Troubleshooting in METADATA_INTEGRATION_GUIDE.md
📊 Tracking? → ../METADATA_CHECKLIST.md
```

---

## Key Features

```
✨ Automatic page title management
✨ Dynamic meta tag injection
✨ Support for name & property attributes
✨ Open Graph & Twitter Card support
✨ Per-page customization
✨ Blog post individual metadata
✨ Auto cleanup on page change
✨ Error handling & fallbacks
✨ Easy Django admin management
✨ One-hook integration
```

---

## Success Criteria ✅

- [x] Metadata fetches from API
- [x] Page title updates automatically
- [x] Meta tags appear in <head>
- [x] Works across all pages
- [x] Dynamic blog posts supported
- [x] Error handling in place
- [x] Cleanup on unmount working
- [x] Documentation complete
- [x] Ready for production

---

## Troubleshooting in 3 Steps

```
1️⃣  Check Django Admin: /admin/
    → Does metadata entry exist?
    
2️⃣  Check Browser DevTools: F12
    → Do you see <meta data-managed-by="prokeys"> tags?
    
3️⃣  Check Network Tab: F12 → Network
    → Is API being called? Any 404s?
```

---

## Common Commands

```bash
# Run Django server
python manage.py runserver

# Run React dev server
npm start

# Check Django admin
http://localhost:8000/admin/

# Test API in browser
http://localhost:8000/api/portal/metadata/

# Open React in browser
http://localhost:3000/
```

---

## The Complete Flow

```
User visits /home
    ↓
usePageMetadata('portal', 'home') runs
    ↓
fetchPageMetadata('portal', 'home') called
    ↓
GET /api/portal/metadata-by-page/?page=home
    ↓
Django returns metadata + meta_tags array
    ↓
applyPageMetadata() injects tags into DOM
    ↓
document.title updated
    ↓
Meta tags appear in <head>
    ↓
Search engines read metadata ✅
    ↓
Social media displays preview ✅
```

---

## Feature Matrix

| Feature | Support | Details |
|---------|---------|---------|
| Page Title | ✅ | Auto set via document.title |
| Meta Description | ✅ | name="description" |
| Keywords | ✅ | name="keywords" |
| Open Graph | ✅ | property="og:*" |
| Twitter Cards | ✅ | name="twitter:*" |
| Robots Meta | ✅ | name="robots" |
| Canonical URLs | ✅ | Supported |
| JSON-LD | ✅ | Supported |
| Dynamic Pages | ✅ | Blog posts, etc |
| Multi-language | ✅ | Ready |

---

## Documentation Map

```
START HERE ↓
README_METADATA.md (This file's companion)
    ↓
METADATA_QUICK_REFERENCE.md (2-5 min)
    ↓
METADATA_COMPLETE_SUMMARY.md (10 min)
    ↓
METADATA_INTEGRATION_GUIDE.md (20 min)
    ↓
METADATA_EXAMPLES.md (Code patterns)
    ↓
METADATA_IMPLEMENTATION_SUMMARY.md (Technical details)
    ↓
../METADATA_CHECKLIST.md (Implementation status)
```

---

## Success Indicators

✅ Metadata entries created in Django admin
✅ Pages use usePageMetadata hook
✅ Page title changes when navigating
✅ Meta tags visible in DevTools Inspector
✅ API calls visible in Network tab
✅ No console errors
✅ Old meta tags clean up on page change

---

**Status: ✅ Complete & Production Ready**

**Next Step: Add metadata in Django admin at /admin/**

---

*For more details, see README_METADATA.md*
