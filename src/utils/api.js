const API_URL = 'http://127.0.0.1:9091';

export const fetchWithApiUrl = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
