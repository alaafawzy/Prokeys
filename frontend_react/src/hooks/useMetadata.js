import { useEffect } from 'react';
import {
  fetchPageMetadata,
  fetchMetadataById,
  applyPageMetadata,
} from '../utils/metadataService';

/**
 * Custom hook to fetch and apply page metadata
 * @param {string} app - App name (portal, bundles, about, blog)
 */
export const usePageMetadata = (app) => {
  useEffect(() => {
    const loadMetadata = async () => {
      const metadata = await fetchPageMetadata(app);
    //   console.log("Fetched metadata for app:", app, metadata);
      if (metadata) {
        // console.log("Metadata fetched:", metadata);
        applyPageMetadata(metadata);
      }
    };

    loadMetadata();

    // Cleanup: Remove managed meta tags on unmount
    return () => {
      document.querySelectorAll('meta[data-managed-by="prokeys"]').forEach(tag => {
        tag.remove();
      });
    };
  }, [app]);
};

/**
 * Custom hook to fetch and apply metadata by ID
 * @param {string} app - App name
 * @param {number} id - Metadata ID or resource ID
 * @param {string} filterParam - Optional filter parameter (e.g., 'service' for filtering by service ID)
 */
export const useMetadataById = (app, id, filterParam = null) => {
  useEffect(() => {
    const loadMetadata = async () => {
      const metadata = await fetchMetadataById(app, id, filterParam);
      if (metadata) {
        applyPageMetadata(metadata);
      }
    };

    if (id) {
      loadMetadata();
    }

    // Cleanup
    return () => {
      document.querySelectorAll('meta[data-managed-by="prokeys"]').forEach(tag => {
        tag.remove();
      });
    };
  }, [app, id, filterParam]);
};
