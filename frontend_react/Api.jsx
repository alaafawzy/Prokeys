import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: '/api/', // Replace with your backend URL
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
  credentials: 'include',
});

export default api;

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get('/api/user/', {
      withCredentials: true, // Include HttpOnly cookies
    });

    // Return the response data if successful
    return response.data;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    // Handle errors (e.g., return null or an error message)
    return null;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      '/api/login/',
      { email, password },
      {
        withCredentials: true, // Include HttpOnly cookies
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response data if successful
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    // Handle errors (e.g., return an error message or false)
    return null;
  }
};
// utils/Http.js
export async function logout() {
  try {
    const response = await fetch('/api/logout/', {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent with the request
    });

    if (response.ok) {
      return true; // Successfully logged out
    } else {
      console.error('Logout failed');
      return false; // Logout failed
    }
  } catch (error) {
    console.error('An error occurred during logout:', error);
    return false; // Error occurred
  }
}

export const register = async (email, password) => {
  try {
    const response = await axios.post(
      '/api/login/',
      { email, password },
      {
        withCredentials: true, // Include HttpOnly cookies
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response data if successful
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    // Handle errors (e.g., return an error message or false)
    return null;
  }
};