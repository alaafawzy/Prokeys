# Metadata Integration Summary

## Files Created

### 1. **Metadata Service** (`src/utils/metadataService.js`)
Core utility functions for fetching and applying metadata:
- `fetchPageMetadata(app, pageIdentifier)` - Fetch metadata by page name
- `fetchMetadataById(app, id)` - Fetch metadata by ID
- `fetchBlogMetadata(blogId)` - Fetch blog post metadata
- `applyPageMetadata(metadata)` - Apply metadata to the current page
- `fetchAndApplyMetadata()` - Convenience function combining both
- Automatic meta tag management with cleanup

### 2. **Custom Hooks** (`src/hooks/useMetadata.js`)
React hooks for easy metadata integration:
- `usePageMetadata(app, pageIdentifier)` - Hook for standard pages
- `useMetadataById(app, id)` - Hook for metadata by ID
- `useBlogMetadata(blogId)` - Hook for blog posts
- Automatic cleanup on component unmount

### 3. **Documentation** (`METADATA_INTEGRATION_GUIDE.md`)
Complete guide on how to use the metadata system in React

## Pages Updated with Metadata

1. **Home** (`src/Pages/Home.jsx`)
   - `usePageMetadata('portal', 'home')`

2. **About Us** (`src/Pages/AboutUs.jsx`)
   - `usePageMetadata('about', 'about')`

3. **Bundles/Packages** (`src/Pages/BundlesPage.jsx`)
   - `usePageMetadata('bundles', 'bundles')`

4. **Blogs List** (`src/Pages/Blogs.jsx`)
   - `usePageMetadata('blog', 'blogs')`

5. **Blog Details** (`src/Pages/BlogDetails.jsx`)
   - `useBlogMetadata(id)` - Dynamic by blog ID

6. **Contact Us** (`src/Pages/CountactUs.jsx`)
   - `usePageMetadata('portal', 'contact')`

7. **Services** (`src/Pages/OurServises.jsx`)
   - `usePageMetadata('portal', 'services')`

## How It Works

### Flow Diagram
```
React Page Component
    ↓
usePageMetadata Hook
    ↓
fetchPageMetadata() Service
    ↓
API Call: /api/{app}/metadata-by-page/?page={identifier}
    ↓
Django Backend Returns Metadata with Meta Tags
    ↓
applyPageMetadata() Injects into HTML
    ↓
document.title + meta tags updated in <head>
    ↓
Page renders with proper SEO metadata
```

### Example Response
```json
{
  "id": 1,
  "page_title": "Home | ProKeys",
  "meta_tags": [
    {
      "id": 1,
      "attribute_type": "name",
      "meta_name": "description",
      "meta_content": "Welcome to ProKeys - Your trusted financial partner",
      "meta_description": "Homepage meta description",
      "order": 1,
      "is_active": true
    },
    {
      "id": 2,
      "attribute_type": "property",
      "meta_name": "og:title",
      "meta_content": "ProKeys - Home",
      "meta_description": "Open Graph title",
      "order": 2,
      "is_active": true
    }
  ],
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

## API Integration Details

### Environment Configuration
- Uses `REACT_APP_API_URL` environment variable
- Falls back to `http://localhost:8000/api` if not set

### API Endpoints Used
- **Portal**: `/api/portal/metadata-by-page/?page=...`
- **About**: `/api/about/metadata-by-page/?page=...`
- **Bundles**: `/api/bundles/metadata-by-page/?page=...`
- **Blog (List)**: `/api/blog/page-metadata/` (optional)
- **Blog (Detail)**: `/api/blog/metadata/{blogId}/`

## Features

✅ **Automatic Meta Tag Injection**
- Dynamically creates and injects meta tags into `<head>`
- Supports both `name` and `property` attributes

✅ **Page Title Management**
- Automatically sets `document.title`

✅ **Smart Cleanup**
- Removes old meta tags when page changes
- Prevents memory leaks by cleaning up on unmount
- Uses `data-managed-by="prokeys"` attribute for identification

✅ **Error Handling**
- Gracefully handles API errors
- Console logging for debugging
- Page continues to work even if metadata fetch fails

✅ **Performance Optimized**
- Minimal API calls (only when page identifier changes)
- Efficient DOM manipulation
- No unnecessary re-renders

## Next Steps

### To Add Metadata to More Pages

1. Go to Django Admin: `/admin/`

2. Navigate to respective app's Metadata section:
   - Portal → Metadata
   - About → Metadata
   - Bundles → Metadata
   - Blog → SigngleBlogMetadata or BlogsPageMetadata

3. Create new metadata entries with:
   - Page title
   - Meta tags (click "Add another Meta Tag"):
     - Attribute type (name or property)
     - Meta tag name (e.g., "description", "og:title")
     - Content (the actual value)
     - Is Active (checkbox)

4. In your React page component, add the hook:
   ```jsx
   usePageMetadata('app-name', 'page-identifier');
   ```

## Environment Setup

### For Local Development
```env
REACT_APP_API_URL=http://localhost:8000/api
```

### For Production
```env
REACT_APP_API_URL=https://yourdomain.com/api
```

## Browser Compatibility

Works with all modern browsers (Chrome, Firefox, Safari, Edge).

Meta tags are created using standard DOM API (`document.createElement`, `document.head.appendChild`).

## SEO Best Practices Supported

✅ Meta descriptions (50-160 characters)
✅ Keywords meta tag
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Robots meta tag (index, follow, etc.)
✅ Canonical URLs
✅ Structured data (JSON-LD)
✅ Language meta tags

## Debugging Tips

### Check if metadata is being fetched:
1. Open Network tab in DevTools
2. Look for requests to `/api/.../metadata-by-page/`
3. Check the response data

### Check if meta tags are being applied:
1. Open Elements/Inspector tab
2. Search for `data-managed-by="prokeys"`
3. Should see meta tags in the `<head>` section

### Enable console logging:
Add `console.log()` statements in `metadataService.js` to debug API calls.

## Files Structure
```
frontend_react/
├── src/
│   ├── Pages/
│   │   ├── Home.jsx (updated)
│   │   ├── AboutUs.jsx (updated)
│   │   ├── BundlesPage.jsx (updated)
│   │   ├── Blogs.jsx (updated)
│   │   ├── BlogDetails.jsx (updated)
│   │   ├── CountactUs.jsx (updated)
│   │   └── OurServises.jsx (updated)
│   ├── hooks/
│   │   └── useMetadata.js (NEW)
│   ├── utils/
│   │   └── metadataService.js (NEW)
│   └── App.jsx
└── METADATA_INTEGRATION_GUIDE.md (NEW)
```

## Support & Testing

To test the metadata system:

1. Start Django backend: `python manage.py runserver`
2. Start React frontend: `npm start`
3. Navigate to any updated page
4. Open DevTools → Network → filter by XHR
5. Look for metadata API calls
6. Check Elements tab for injected meta tags
