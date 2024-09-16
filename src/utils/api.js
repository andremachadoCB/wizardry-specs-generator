import { useState, useEffect } from 'react';

const defaultApiUrl = 'http://127.0.0.1:8000';

export const getApiUrl = () => {
  return localStorage.getItem('apiUrl') || defaultApiUrl;
};

export const setApiUrl = (url) => {
  localStorage.setItem('apiUrl', url);
};

export const useApiUrl = () => {
  const [apiUrl, setApiUrlState] = useState(getApiUrl());

  useEffect(() => {
    const handleStorageChange = () => {
      setApiUrlState(getApiUrl());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateApiUrl = (newUrl) => {
    setApiUrl(newUrl);
    setApiUrlState(newUrl);
  };

  return [apiUrl, updateApiUrl];
};

export const fetchWithApiUrl = async (endpoint, options = {}) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};