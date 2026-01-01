# API Endpoints for SEO Metadata

This document provides a comprehensive guide to all the new API endpoints created for fetching metadata across your Django project.

## Base URLs
- **Portal**: `/api/portal/`
- **Bundles**: `/api/bundles/`
- **About**: `/api/about/`
- **Blog**: `/api/blog/`

---

## Portal App Endpoints

### Metadata
- **List all Portal metadata**
  - `GET /api/portal/metadata/`
  - Returns all page metadata with their meta tags

- **Get specific metadata**
  - `GET /api/portal/metadata/{id}/`
  - Returns metadata for a specific ID

- **Get metadata by page name**
  - `GET /api/portal/metadata-by-page/?page=home`
  - Filter metadata by page name

### Meta Tags
- **List all active meta tags**
  - `GET /api/portal/meta-tags/`
  - Returns only active meta tags

- **Get specific meta tag**
  - `GET /api/portal/meta-tags/{id}/`
  - Returns a specific meta tag

---

## Bundles App Endpoints

### Metadata
- **List all Bundles metadata**
  - `GET /api/bundles/metadata/`
  - Returns all bundle page metadata

- **Get specific metadata**
  - `GET /api/bundles/metadata/{id}/`
  - Returns metadata for a specific ID

- **Get metadata by page name**
  - `GET /api/bundles/metadata-by-page/?page=bundles`
  - Filter metadata by page name

### Meta Tags
- **List all active meta tags**
  - `GET /api/bundles/meta-tags/`
  - Returns only active meta tags

### Bundles
- **List all bundles**
  - `GET /api/bundles/bundles/`
  - Returns all bundle data

- **Get specific bundle**
  - `GET /api/bundles/bundles/{id}/`
  - Returns a specific bundle

### Advantages
- **List all advantages**
  - `GET /api/bundles/advantages/`
  - Returns all advantage items

- **Get specific advantage**
  - `GET /api/bundles/advantages/{id}/`
  - Returns a specific advantage

---

## About App Endpoints

### Metadata
- **List all About metadata**
  - `GET /api/about/metadata/`
  - Returns all about page metadata

- **Get specific metadata**
  - `GET /api/about/metadata/{id}/`
  - Returns metadata for a specific ID

- **Get metadata by page name**
  - `GET /api/about/metadata-by-page/?page=about`
  - Filter metadata by page name

### Meta Tags
- **List all active meta tags**
  - `GET /api/about/meta-tags/`
  - Returns only active meta tags

### About Us
- **List all About Us pages**
  - `GET /api/about/about-us/`
  - Returns all about us content

- **Get specific About Us**
  - `GET /api/about/about-us/{id}/`
  - Returns specific about us content

### About Sections
- **List all About Sections**
  - `GET /api/about/sections/`
  - Returns all sections with their content

- **Get specific section**
  - `GET /api/about/sections/{id}/`
  - Returns a specific section

### Section Items
- **List all section items**
  - `GET /api/about/section-items/`
  - Returns all section advantages

- **Get specific item**
  - `GET /api/about/section-items/{id}/`
  - Returns a specific section item

---

## Blog App Endpoints

### Blog Posts
- **List all blogs**
  - `GET /api/blog/`
  - Returns all blog posts

- **Get specific blog**
  - `GET /api/blog/{id}/`
  - Returns a specific blog post

### Single Blog Metadata
- **List all single blog metadata**
  - `GET /api/blog/single-metadata/`
  - Returns metadata for individual blog posts

- **Get specific blog metadata**
  - `GET /api/blog/single-metadata/{id}/`
  - Returns metadata for a specific blog post

- **Get metadata by blog ID**
  - `GET /api/blog/metadata/{blog_id}/`
  - Returns metadata directly by blog ID

### Single Blog Meta Tags
- **List all blog meta tags**
  - `GET /api/blog/single-meta-tags/`
  - Returns all meta tags for blog posts

- **Get specific meta tag**
  - `GET /api/blog/single-meta-tags/{id}/`
  - Returns a specific meta tag

### Blogs Page Metadata
- **List blogs page metadata**
  - `GET /api/blog/page-metadata/`
  - Returns metadata for the blogs list page

- **Get specific page metadata**
  - `GET /api/blog/page-metadata/{id}/`
  - Returns specific page metadata

### Blogs Page Meta Tags
- **List page meta tags**
  - `GET /api/blog/page-meta-tags/`
  - Returns all meta tags for the blogs list page

- **Get specific meta tag**
  - `GET /api/blog/page-meta-tags/{id}/`
  - Returns a specific meta tag

---

## Response Structure

### Metadata Response
```json
{
  "id": 1,
  "page_title": "Home Page",
  "meta_tags": [
    {
      "id": 1,
      "attribute_type": "name",
      "meta_name": "description",
      "meta_content": "This is the home page",
      "meta_description": "Homepage meta description",
      "order": 1,
      "is_active": true
    }
  ],
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### Meta Tag Response
```json
{
  "id": 1,
  "attribute_type": "property",
  "meta_name": "og:title",
  "meta_content": "Home Page - ProKeys",
  "meta_description": "Open Graph title for social sharing",
  "order": 1,
  "is_active": true
}
```

---

## Implementation in Frontend

### Example: Using Metadata in React
```javascript
import axios from 'axios';

// Fetch metadata for a page
async function getPageMetadata(page) {
  try {
    const response = await axios.get(`/api/portal/metadata-by-page/?page=${page}`);
    const metadata = response.data.results[0]; // If using pagination
    
    // Set page title
    document.title = metadata.page_title;
    
    // Set meta tags
    metadata.meta_tags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute(tag.attribute_type, tag.meta_name);
      meta.content = tag.meta_content;
      document.head.appendChild(meta);
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
}

// Usage
getPageMetadata('home');
```

### Example: Using Blog Metadata
```javascript
// Get metadata for a specific blog post
async function getBlogMetadata(blogId) {
  try {
    const response = await axios.get(`/api/blog/metadata/${blogId}/`);
    const metadata = response.data;
    
    document.title = metadata.page_title;
    
    // Add meta tags for SEO
    metadata.meta_tags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute(tag.attribute_type, tag.meta_name);
      meta.content = tag.meta_content;
      document.head.appendChild(meta);
    });
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }
}
```

---

## Notes

1. All metadata endpoints use **read-only permissions** (GET requests only)
2. Meta tags with `is_active=false` won't be returned by default
3. Use pagination if needed by adding `?page=1&page_size=10` to list endpoints
4. For filtering by multiple fields, use Django's query parameters syntax
5. The `metadata-by-page/` endpoints support case-insensitive page name filtering

---

## Admin Panel

All metadata can be managed through the Django admin panel:
- Portal: `/admin/portal/metadata/`
- Bundles: `/admin/bundles/metadata/`
- About: `/admin/about/metadata/`
- Blog: `/admin/blog/signgleblogmetadata/` and `/admin/blog/blogspagemetadata/`
