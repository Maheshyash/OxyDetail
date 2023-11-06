import { useState, useEffect } from 'react';
import { loginDetails } from '../types/loginTypes';
import { addCookie, clearAllCookies, getCookie } from '../utils/common';

export function useAuth() {
  const [token, setToken] = useState<string | null | undefined>(null);

  // Check if a token is available (e.g., in localStorage) when the component mounts.
  useEffect(() => {
    // const storedToken = localStorage.getItem('token');
    const storedToken = getCookie('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to set the token (you can use this to update the token when it becomes available).
  const setAuthToken = (userDetails: loginDetails) => {
    setToken(userDetails?.token);
    if (userDetails?.token) {
      addCookie('token', userDetails?.token);
      // addCookie('userDetails', JSON.stringify(userDetails?.userDetails));
      localStorage.setItem('userDetails', JSON.stringify(userDetails?.userDetails));
      localStorage.setItem('menu', JSON.stringify(userDetails?.menu));
    }
  };

  // Function to remove the token (you can use this when the user logs out).
  const removeAuthToken = () => {
    setToken(null);
    clearAllCookies();
    localStorage.clear();
  };

  return { token, setAuthToken, removeAuthToken };
}
