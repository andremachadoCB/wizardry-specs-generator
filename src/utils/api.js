const API_URL = 'https://c763-74-14-7-169.ngrok-free.app';

export const fetchWithApiUrl = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
