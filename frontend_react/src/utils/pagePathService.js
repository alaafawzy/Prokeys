import axios from 'axios';
import { API_BASE_URL } from '../../Api';

/**
 * Fetch configurable page paths from the backend.
 * Endpoint: GET /api/page-paths/
 * Returns an array of objects like:
 *   { id, key, english_path, arabic_path }
 */
export async function fetchPagePathsConfig() {
  try {
    const response = await axios.get(`${API_BASE_URL}/page-paths/`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching page paths config:', error);
    return [];
  }
}
