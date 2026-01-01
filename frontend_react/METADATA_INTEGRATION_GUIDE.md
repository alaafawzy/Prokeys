# Frontend Metadata Integration Guide

This guide explains how to use the SEO metadata fetched from the Django backend in your React frontend.

## Setup

### 1. Environment Variables

Make sure your `.env` file has the correct API URL:

```
REACT_APP_API_URL=http://localhost:8000/api
```

Or in production:
```
REACT_APP_API_URL=https://your-domain.com/api
```

## Usage

### Method 1: Using the Custom Hook (Recommended)

The easiest way to add metadata to any page is using the custom hooks:

#### For Pages with Fixed Identifiers

```jsx
import { usePageMetadata } from '../hooks/useMetadata';

export default function HomePage() {
  // Load metadata for the home page
  usePageMetadata('portal', 'home');
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

#### For Dynamic Pages (like Blog Details)

```jsx
import { useBlogMetadata } from '../hooks/useMetadata';
import { useParams } from 'react-router-dom';

export default function BlogDetails() {
  const { id } = useParams();
  
  // Load metadata for the specific blog post
  useBlogMetadata(id);
  
  return (
    <div>
      {/* Your blog content */}
    </div>
  );
}
```

#### For Metadata by ID

```jsx
import { useMetadataById } from '../hooks/useMetadata';

export default function CustomPage() {
  // Load metadata by ID (if you know the ID)
  useMetadataById('portal', 1);
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

### Method 2: Using the Service Functions Directly

If you need more control or want to fetch and use the metadata data:

```jsx
import { fetchPageMetadata, applyPageMetadata } from '../utils/metadataService';
import { useEffect } from 'react';

export default function MyPage() {
  useEffect(() => {
    const loadMetadata = async () => {
      const metadata = await fetchPageMetadata('portal', 'home');
      if (metadata) {
        applyPageMetadata(metadata);
        // You can also use the metadata data for other purposes
        console.log('Page Title:', metadata.page_title);
        console.log('Meta Tags:', metadata.meta_tags);
      }
    };
    
    loadMetadata();
  }, []);
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

## Pages with Metadata Integration

The following pages have been updated with metadata integration:

1. **Home Page** (`/home`)
   - App: `portal`
   - Page identifier: `home`

2. **About Us** (`/about`)
   - App: `about`
   - Page identifier: `about`

3. **Bundles/Packages** (`/bundles`)
   - App: `bundles`
   - Page identifier: `bundles`

4. **Blogs List** (`/blogs`)
   - App: `blog`
   - Page identifier: `blogs`

5. **Blog Details** (`/blogs/:id`)
   - App: `blog`
   - Uses blog ID for dynamic metadata

6. **Contact Us** (`/contact`)
   - App: `portal`
   - Page identifier: `contact`

7. **Services** (`/services`)
   - App: `portal`
   - Page identifier: `services`

## What Gets Set

When metadata is applied to a page, the following changes occur:

### 1. Page Title
```jsx
// Before: "My App"
document.title = metadata.page_title;
// After: "Home | ProKeys - Your Business Partner"
```

### 2. Meta Tags
The service automatically creates and injects meta tags with `data-managed-by="prokeys"` attribute.

Examples of meta tags that can be set:

```html
<!-- Standard meta tags -->
<meta name="description" content="Welcome to ProKeys...">
<meta name="keywords" content="accounting, finance, tax">

<!-- Open Graph tags (for social media) -->
<meta property="og:title" content="ProKeys - Home">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ProKeys - Home">
<meta name="twitter:description" content="...">

<!-- Robots and other SEO -->
<meta name="robots" content="index, follow">
```

## Cleanup

The hooks automatically clean up old meta tags when:
- The page component unmounts
- The page identifier changes

Meta tags are identified by the `data-managed-by="prokeys"` attribute, so they won't interfere with other meta tags.

## Adding Metadata to a New Page

To add metadata support to any new page:

1. **Import the hook** (if using React):
   ```jsx
   import { usePageMetadata } from '../hooks/useMetadata';
   ```

2. **Use the hook** in your component:
   ```jsx
   export default function NewPage() {
     // Load metadata for your page
     usePageMetadata('app-name', 'page-identifier');
     
     return (
       // Your JSX
     );
   }
   ```

3. **Add the metadata in Django Admin**:
   - Go to `/admin/app-name/metadata/`
   - Create a new metadata entry with `page_title` = your page title
   - Add meta tags by clicking "Add another Meta Tag"

## Metadata Structure

Metadata objects have this structure:

```json
{
  "id": 1,
  "page_title": "Home | ProKeys",
  "meta_tags": [
    {
      "id": 1,
      "attribute_type": "name",
      "meta_name": "description",
      "meta_content": "Welcome to ProKeys...",
      "meta_description": "Standard meta description",
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

### Field Explanations

- **attribute_type**: Either `"name"` (for standard meta tags) or `"property"` (for Open Graph/structured data)
- **meta_name**: The meta tag name/property (e.g., "description", "og:title")
- **meta_content**: The actual content/value of the meta tag
- **meta_description**: Admin-only description of what this tag does
- **order**: Controls the order meta tags are rendered
- **is_active**: If false, this tag won't be rendered on the page

## API Endpoints Reference

For reference, here are the API endpoints available:

### Portal
- `GET /api/portal/metadata/` - List all portal metadata
- `GET /api/portal/metadata/{id}/` - Get specific metadata
- `GET /api/portal/metadata-by-page/?page=home` - Get metadata by page name

### Bundles
- `GET /api/bundles/metadata/` - List all bundles metadata
- `GET /api/bundles/metadata/{id}/` - Get specific metadata
- `GET /api/bundles/metadata-by-page/?page=bundles` - Get metadata by page name

### About
- `GET /api/about/metadata/` - List all about metadata
- `GET /api/about/metadata/{id}/` - Get specific metadata
- `GET /api/about/metadata-by-page/?page=about` - Get metadata by page name

### Blog
- `GET /api/blog/single-metadata/` - List all blog post metadata
- `GET /api/blog/metadata/{blog_id}/` - Get metadata for specific blog post
- `GET /api/blog/page-metadata/` - Get metadata for blogs list page

## Troubleshooting

### Metadata not showing?

1. Check browser console for errors
2. Verify the API URL in `.env` is correct
3. Make sure metadata exists in Django Admin at `/admin/`
4. Check that the page identifier matches what you used in the hook

### Meta tags not rendering?

1. Open browser DevTools (F12)
2. Go to Elements/Inspector tab
3. Look for meta tags with `data-managed-by="prokeys"` attribute
4. If not there, check the console for API errors

### Testing without Django backend

For local testing, you can mock the API responses by temporarily modifying `metadataService.js`:

```javascript
// Temporary mock for testing
const mockMetadata = {
  page_title: "Test Page",
  meta_tags: [
    {
      attribute_type: "name",
      meta_name: "description",
      meta_content: "Test description"
    }
  ]
};
```
