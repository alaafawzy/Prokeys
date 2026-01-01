import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Fetch metadata for a specific page
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {string} pageIdentifier - Page identifier or name
 * @returns {Promise<Object>} Metadata object with meta tags
 */
export const fetchPageMetadata = async (app) => {
  try {
    let url;
    if (app==''){url = `${API_BASE_URL}/metadata/`;}
    else { url = `${API_BASE_URL}/${app}/metadata/`;}
    const response = await axios.get(
      url
    );
    // console.log("Metadata response:", response.data);
    // if (response.data && response.data.results && response.data.results.length > 0) {
    //   return response.data.results[0];
    // }
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching ${app} metadata for page =:`, error);
    return null;
  }
};

/**
 * Fetch metadata by ID
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {number} id - Metadata ID or resource ID for filtering
 * @param {string} filterParam - Optional filter parameter name (e.g., 'service' for filtering by service ID)
 * @returns {Promise<Object>} Metadata object with meta tags
 */
export const fetchMetadataById = async (app, id, filterParam = null) => {
  try {
    let url;
    if (filterParam) {
      // Use query parameter filtering (e.g., ?service=1)
      url = `${API_BASE_URL}/${app}/?${filterParam}=${id}`;
      const response = await axios.get(url);
      // Return first result if it's an array
      return Array.isArray(response.data) ? response.data[0] : response.data;
    } else {
      // Use direct ID lookup
      url = `${API_BASE_URL}/${app}/${id}/`;
      const response = await axios.get(url);
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching metadata for ${app} with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetch blog metadata by blog ID
 * @param {number} blogId - Blog post ID
 * @returns {Promise<Object>} Blog metadata with meta tags
 */
// export const fetchBlogMetadata = async (blogId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/blog/metadata/${blogId}/`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching blog metadata for blog ID ${blogId}:`, error);
//     return null;
//   }
// };

/**
 * Apply metadata to the page (sets title and meta tags)
 * @param {Object} metadata - Metadata object containing page_title and meta_tags
 */
export const applyPageMetadata = (metadata) => {
  if (!metadata) return;

  // Set page title
  if (metadata.page_title) {
    document.title = metadata.page_title;
  }

  // Remove old meta tags (except those we shouldn't touch)
  const metaTagsToRemove = document.querySelectorAll(
    'meta[data-managed-by="prokeys"]'
  );
  metaTagsToRemove.forEach(tag => tag.remove());

  // Add new meta tags
  if (metadata.meta_tags && Array.isArray(metadata.meta_tags)) {
    metadata.meta_tags.forEach(tag => {

      const meta = document.createElement('meta');
      meta.setAttribute('data-managed-by', 'prokeys');
      meta.setAttribute(tag.attribute_type, tag.meta_name);
      meta.content = tag.meta_content;
      document.head.appendChild(meta);
    });
  }
};

/**
 * Fetch and apply metadata for a page
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {string} pageIdentifier - Page identifier or name
 */

/**
 * Fetch and apply metadata by ID
 * @param {string} app - App name
 * @param {number} id - Metadata ID
 */
export const fetchAndApplyMetadataById = async (app, id) => {
  const metadata = await fetchMetadataById(app, id);
  if (metadata) {
    applyPageMetadata(metadata);
  }
  return metadata;
};


