# Metadata Integration - Practical Examples

This file contains practical code examples for using metadata in your React components.

## Example 1: Simple Page with Fixed Identifier

### Code
```jsx
// src/Pages/Home.jsx
import React from "react";
import { usePageMetadata } from "../hooks/useMetadata";
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Home() {
  // Load metadata for home page - very simple!
  usePageMetadata('portal', 'home');

  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
}
```

### What Happens
1. When Home component mounts, hook fetches metadata from `/api/portal/metadata-by-page/?page=home`
2. Metadata is applied (page title and meta tags)
3. When component unmounts, old meta tags are cleaned up

---

## Example 2: Dynamic Page (Blog Post)

### Code
```jsx
// src/Pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogMetadata } from "../hooks/useMetadata";
import api from "../../Api";

export default function BlogDetails() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  // Load metadata for this specific blog post
  useBlogMetadata(id); // Fetches from /api/blog/metadata/{id}/

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/${id}/`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.english_title}</h1>
      <div>{blog.english_content}</div>
    </div>
  );
}
```

### What Happens
1. User navigates to `/blog/123`
2. `id` is extracted from URL (123)
3. `useBlogMetadata(123)` fetches metadata for blog ID 123
4. Page title and meta tags are set for that specific blog post
5. Each blog post can have its own unique SEO metadata

---

## Example 3: Manual Control with Service Functions

### Code
```jsx
// src/Pages/CustomPage.jsx
import React, { useEffect, useState } from "react";
import { fetchPageMetadata, applyPageMetadata } from "../utils/metadataService";

export default function CustomPage() {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        // Fetch metadata
        const data = await fetchPageMetadata('portal', 'home');
        
        if (data) {
          // Store for use in component
          setMetadata(data);
          
          // Apply to page
          applyPageMetadata(data);
        }
      } catch (err) {
        setError(err);
      }
    };

    loadMetadata();
  }, []);

  return (
    <div>
      <h1>{metadata?.page_title || 'Loading...'}</h1>
      
      {metadata && (
        <div>
          <h2>Meta Tags on This Page:</h2>
          <ul>
            {metadata.meta_tags?.map(tag => (
              <li key={tag.id}>
                <strong>{tag.meta_name}</strong>: {tag.meta_content}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <div style={{color: 'red'}}>Error loading metadata</div>}
    </div>
  );
}
```

### What Happens
1. Component has full control over metadata fetching and application
2. Can display metadata information on the page if needed
3. Better for debugging or custom implementations

---

## Example 4: Multi-Language Support

### Code
```jsx
// src/Pages/AboutUs.jsx
import React from "react";
import { usePageMetadata } from "../hooks/useMetadata";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { i18n } = useTranslation();
  
  // Load different metadata based on language
  const pageIdentifier = i18n.language === 'ar' ? 'about-ar' : 'about';
  usePageMetadata('about', pageIdentifier);

  return (
    <div>
      {/* Your about content */}
    </div>
  );
}
```

### What Happens
1. When language changes, different metadata is loaded
2. Each language can have its own SEO metadata
3. Metadata updates automatically when language changes

---

## Example 5: With Loading State

### Code
```jsx
// src/Pages/ServiceDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMetadataById } from "../utils/metadataService";
import api from "../../Api";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const metadata = await fetchMetadataById('services', id);
        if (metadata) {
          document.title = metadata.page_title;
          // Apply other metadata...
        }
      } finally {
        setMetadataLoading(false);
      }
    };

    loadMetadata();
  }, [id]);

  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await api.get(`/services/${id}/`);
        setService(response.data);
      } catch (error) {
        console.error("Error loading service:", error);
      }
    };

    loadService();
  }, [id]);

  if (metadataLoading || !service) return <div>Loading...</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
    </div>
  );
}
```

---

## Example 6: In a Layout Component

### Code
```jsx
// src/layout/MainLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { usePageMetadata } from "../hooks/useMetadata";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();

  // Auto-load metadata based on route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      usePageMetadata('portal', 'home');
    } else if (path === '/about') {
      usePageMetadata('about', 'about');
    } else if (path === '/bundles') {
      usePageMetadata('bundles', 'bundles');
    }
    // ... etc
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

---

## Example 7: Error Handling and Fallbacks

### Code
```jsx
// src/Pages/RobustPage.jsx
import React, { useEffect } from "react";
import { usePageMetadata } from "../hooks/useMetadata";

export default function RobustPage() {
  // This hook handles errors gracefully internally
  usePageMetadata('portal', 'services');

  // Fallback page title in case metadata fetch fails
  useEffect(() => {
    if (!document.title.includes('|')) {
      // If no metadata was applied, set a fallback
      document.title = 'Services | ProKeys';
    }
  }, []);

  return (
    <div>
      <h1>Our Services</h1>
      {/* Page content */}
    </div>
  );
}
```

---

## Testing Metadata Integration

### Manual Testing Checklist
```javascript
// In browser console, check:

// 1. Check if meta tags exist
document.querySelectorAll('meta[data-managed-by="prokeys"]').length > 0
// Should return true if metadata was applied

// 2. Check specific meta tag
document.querySelector('meta[name="description"]')?.content
// Should return your description

// 3. Check page title
document.title
// Should return your page title

// 4. Check all metadata tags
Array.from(document.querySelectorAll('meta[data-managed-by="prokeys"]')).forEach(tag => {
  console.log(`${tag.getAttribute('name') || tag.getAttribute('property')}: ${tag.content}`);
});
```

### Automated Testing Example
```javascript
// src/__tests__/metadata.test.js
import { render, waitFor } from '@testing-library/react';
import Home from '../Pages/Home';

describe('Metadata Integration', () => {
  test('Home page should have metadata', async () => {
    render(<Home />);
    
    await waitFor(() => {
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta).toBeInTheDocument();
      expect(document.title).toBeTruthy();
    });
  });
});
```

---

## Common Patterns

### Pattern 1: Page with Subpages
```jsx
// Each subpage gets different metadata
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  usePageMetadata('portal', `dashboard-${activeTab}`);

  return (
    <div>
      <button onClick={() => setActiveTab('overview')}>Overview</button>
      <button onClick={() => setActiveTab('analytics')}>Analytics</button>
      {/* Content changes and metadata updates */}
    </div>
  );
}
```

### Pattern 2: Conditional Metadata
```jsx
// Different metadata based on user role
function UserProfile() {
  const { user } = useAuth();
  
  const pageId = user?.isAdmin ? 'profile-admin' : 'profile-user';
  usePageMetadata('portal', pageId);

  return <div>{/* Profile content */}</div>;
}
```

### Pattern 3: SEO-Optimized List
```jsx
// Each list item links to detailed page with its own metadata
function BlogList() {
  usePageMetadata('blog', 'blogs-list');

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs...
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <Link key={blog.id} to={`/blog/${blog.id}`}>
          {blog.title}
        </Link>
      ))}
    </div>
  );
}
```

---

## Troubleshooting Examples

### Issue: Meta tags not appearing
```javascript
// Debug in console
const metaTags = document.querySelectorAll('meta[data-managed-by="prokeys"]');
console.log('Found', metaTags.length, 'managed meta tags');
metaTags.forEach(tag => {
  console.log(tag.outerHTML);
});
```

### Issue: API call failing
```javascript
// Check API in network tab or add logging to metadataService.js
// In metadataService.js, add:
export const fetchPageMetadata = async (app, pageIdentifier) => {
  const url = `${API_BASE_URL}/${app}/metadata-by-page/?page=${pageIdentifier}`;
  console.log('Fetching from:', url); // Check URL is correct
  // ...
};
```

### Issue: Metadata not updating on route change
```javascript
// Make sure your component re-renders when route changes
// Use useParams or useLocation to track changes
import { useParams } from 'react-router-dom';

export default function DynamicPage() {
  const { id } = useParams(); // This triggers re-render when URL changes
  useBlogMetadata(id);
  // ...
}
```
