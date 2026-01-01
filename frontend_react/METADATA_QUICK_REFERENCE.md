# Metadata Integration - Quick Reference

## Quick Start (2 minutes)

### Step 1: Import the hook
```jsx
import { usePageMetadata } from '../hooks/useMetadata';
```

### Step 2: Use it in your component
```jsx
export default function MyPage() {
  usePageMetadata('app-name', 'page-id');
  return <div>Your content here</div>;
}
```

### Step 3: Add metadata in Django Admin
Visit `/admin/` → Select your app → Metadata → Add entry

**Done!** Your page now has SEO metadata.

---

## Hook Cheat Sheet

### For Standard Pages
```jsx
usePageMetadata('portal', 'home')        // Home page
usePageMetadata('about', 'about')        // About page
usePageMetadata('bundles', 'bundles')    // Bundles page
usePageMetadata('blog', 'blogs')         // Blogs list page
usePageMetadata('portal', 'contact')     // Contact page
usePageMetadata('portal', 'services')    // Services page
```

### For Dynamic Pages
```jsx
useBlogMetadata(id)  // Blog post with dynamic ID
useMetadataById('app', id)  // Generic by ID
```

---

## Service Functions Cheat Sheet

### Fetch Functions
```jsx
// Fetch by page identifier
fetchPageMetadata('portal', 'home')

// Fetch by metadata ID
fetchMetadataById('portal', 1)

// Fetch blog metadata
fetchBlogMetadata(123)
```

### Apply Functions
```jsx
// Apply to page (sets title and meta tags)
applyPageMetadata(metadata)

// All-in-one (fetch + apply)
fetchAndApplyMetadata('portal', 'home')
fetchAndApplyMetadataById('portal', 1)
fetchAndApplyBlogMetadata(123)
```

---

## Page Integration Status

| Page | File | Hook Used | Status |
|------|------|-----------|--------|
| Home | `src/Pages/Home.jsx` | `usePageMetadata('portal', 'home')` | ✅ Done |
| About Us | `src/Pages/AboutUs.jsx` | `usePageMetadata('about', 'about')` | ✅ Done |
| Bundles | `src/Pages/BundlesPage.jsx` | `usePageMetadata('bundles', 'bundles')` | ✅ Done |
| Blogs | `src/Pages/Blogs.jsx` | `usePageMetadata('blog', 'blogs')` | ✅ Done |
| Blog Details | `src/Pages/BlogDetails.jsx` | `useBlogMetadata(id)` | ✅ Done |
| Contact | `src/Pages/CountactUs.jsx` | `usePageMetadata('portal', 'contact')` | ✅ Done |
| Services | `src/Pages/OurServises.jsx` | `usePageMetadata('portal', 'services')` | ✅ Done |

---

## API Endpoints Quick Reference

```
GET /api/portal/metadata-by-page/?page=home
GET /api/portal/metadata-by-page/?page=contact
GET /api/portal/metadata-by-page/?page=services

GET /api/about/metadata-by-page/?page=about

GET /api/bundles/metadata-by-page/?page=bundles

GET /api/blog/page-metadata/
GET /api/blog/metadata/{blogId}/
```

---

## Environment Setup

### Local Development
```bash
# .env file
REACT_APP_API_URL=http://localhost:8000/api
```

### Production
```bash
# .env.production
REACT_APP_API_URL=https://yourdomain.com/api
```

---

## What Gets Injected

When metadata is applied, these are created:

1. **Page Title**
   ```html
   <title>Your Page Title</title>
   ```

2. **Meta Tags** (examples)
   ```html
   <meta data-managed-by="prokeys" name="description" content="...">
   <meta data-managed-by="prokeys" property="og:title" content="...">
   <meta data-managed-by="prokeys" property="og:image" content="...">
   <meta data-managed-by="prokeys" name="twitter:card" content="...">
   ```

---

## Debugging Commands

```javascript
// Check if metadata was applied
document.querySelectorAll('meta[data-managed-by="prokeys"]').length

// See all managed meta tags
Array.from(document.querySelectorAll('meta[data-managed-by="prokeys"]'))
  .forEach(tag => console.log(tag.outerHTML))

// Check page title
document.title

// Check specific meta tag
document.querySelector('meta[name="description"]')?.content
```

---

## Common Metadata Types

| Meta Tag | Example | Purpose |
|----------|---------|---------|
| `description` | "Your page description" | Google search results |
| `keywords` | "accounting, finance" | Search keywords |
| `og:title` | "Page Title" | Facebook/LinkedIn title |
| `og:description` | "Description" | Facebook/LinkedIn description |
| `og:image` | "image-url.jpg" | Facebook/LinkedIn image |
| `twitter:card` | "summary_large_image" | Twitter card type |
| `twitter:title` | "Title" | Twitter title |
| `robots` | "index, follow" | Search engine robots |

---

## Adding New Page

1. Create/update page component
2. Add at top: `import { usePageMetadata } from '../hooks/useMetadata';`
3. Add in component: `usePageMetadata('app', 'page-id');`
4. Go to `/admin/{app}/metadata/` in Django
5. Create new metadata entry with page title and meta tags

That's it! ✅

---

## File Locations

```
frontend_react/
├── src/
│   ├── hooks/
│   │   └── useMetadata.js          ← Custom hooks
│   ├── utils/
│   │   └── metadataService.js      ← Service functions
│   ├── Pages/
│   │   ├── Home.jsx                ← Updated
│   │   ├── AboutUs.jsx             ← Updated
│   │   ├── BundlesPage.jsx         ← Updated
│   │   ├── Blogs.jsx               ← Updated
│   │   ├── BlogDetails.jsx         ← Updated
│   │   ├── CountactUs.jsx          ← Updated
│   │   └── OurServises.jsx         ← Updated
│   └── App.jsx
├── METADATA_INTEGRATION_GUIDE.md       ← Full guide
├── METADATA_IMPLEMENTATION_SUMMARY.md  ← What was done
└── METADATA_EXAMPLES.md                ← Code examples
```

---

## Verification Checklist

- [ ] Metadata service created (`metadataService.js`)
- [ ] Custom hooks created (`useMetadata.js`)
- [ ] All pages updated with metadata hooks
- [ ] Environment variables set (`.env`)
- [ ] Django backend running (migrations done)
- [ ] Metadata entries created in Django Admin
- [ ] Open DevTools and check for meta tags
- [ ] Test different pages and check `document.title`

---

## Quick Test

```javascript
// In browser console on any page:
1. Check: document.title
2. Check: document.querySelectorAll('meta[data-managed-by="prokeys"]').length
3. Check: Inspect → Head element for meta tags
```

---

## Support Files

| File | Purpose |
|------|---------|
| `METADATA_INTEGRATION_GUIDE.md` | Detailed usage guide |
| `METADATA_IMPLEMENTATION_SUMMARY.md` | What was implemented |
| `METADATA_EXAMPLES.md` | Code examples and patterns |
| This file | Quick reference |

---

## Help & Troubleshooting

**Q: Metadata not showing?**
A: Check console for errors, verify API URL in .env, check if metadata exists in Django admin

**Q: Meta tags not in DOM?**
A: Use DevTools Inspector to check Elements tab, look for `data-managed-by="prokeys"` attribute

**Q: Getting API errors?**
A: Verify Django backend is running, check API URL, check CORS settings if cross-origin

**Q: Want to add more pages?**
A: Follow the 3-step quick start above for each new page

---

Last Updated: January 2025
