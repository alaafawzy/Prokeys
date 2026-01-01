import { Description } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

// Create an Axios instance
const api = axios.create({
  // baseURL: '/api/', // Replace with your backend URL
  baseURL: '/api', // Replace with your backend URL
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
    // const response = await axios.get('http://127.0.0.1:8000/api/user/', {
      withCredentials: true, // Include HttpOnly cookies
    });

    // Return the response data if successful
    console.log(response.status);
    
    return response;
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
      // 'http://127.0.0.1:8000/api/login/',
      { email, password },
      {
        withCredentials: true, // Include HttpOnly cookies
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response data if successful
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    // Handle errors (e.g., return an error message or false)
    return error;
  }
};
// utils/Http.js
export async function logout() {
  try {
    const response = await fetch('/api/logout/', {
    // const response = await fetch('http://127.0.0.1:8000/api/logout/', {
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

export const RegisterApi = async (first_name, last_name,email,password,phone,tax_record) => {
  try {
    const response = await axios.post(
      '/api/register/',
      // 'http://127.0.0.1:8000/api/register/',
      { first_name, last_name,email,password,phone,tax_record},
      {
        withCredentials: true, // Include HttpOnly cookies
        headers: {
          'Content-Type': 'multipart/form-data',
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

// Example function to submit feedback with CSRF token
export const AddFeedback = async (description, role) => {
  try {
    const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies
    console.log(csrfToken)
    const csrfToken1 = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
    console.log(csrfToken1);
    const response = await axios.post(
      // 'http://127.0.0.1:8000/api/comment/',
      '/api/comment/',
      { description, role },
      {
        withCredentials: true,
        headers: {'X-CSRFToken': csrfToken  },
      }
    );
    return response;
  } catch (error) {
    console.error('Feedback submission failed:', error);
    return error;
  }
};
export const ForgetPasswordApi = async (email) => {
  try {
    const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies
    console.log(csrfToken)
    const response = await axios.post(
      // 'http://127.0.0.1:8000/api/comment/',
      // '/api/reset/',
      '/api/forget-password/',
      { email },
      {
        withCredentials: true,
        headers: {'X-CSRFToken': csrfToken  },
      }
    );
    return response;
  } catch (error) {
    console.error('Forget Password failed:', error);
    return error;
  }
};

export const ContactUsApi = async (name, company_name,email,phone,details) => {
  try {
    const response = await axios.post(
      '/api/contactus/',
      // 'http://127.0.0.1:8000/api/register/',
      { name, company_name,email,phone,details},
      {
        withCredentials: true, // Include HttpOnly cookies
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Return the response data if successful
    return response;
  } catch (error) {
    // Handle errors (e.g., return an error message or false)
    return null;
  }
};

