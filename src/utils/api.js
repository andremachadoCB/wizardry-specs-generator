const API_URL = 'https://0186-74-14-7-169.ngrok-free.app';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const fetchWithApiUrl = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new ApiError(0, 'Unable to reach the server. Please check your connection.');
  }
  if (response.status === 401 || response.status === 403) {
    throw new ApiError(response.status, 'You do not have permission to access this resource.');
  }
  if (response.status === 404) {
    throw new ApiError(404, 'The requested resource was not found.');
  }
  if (!response.ok) {
    throw new ApiError(response.status, 'Something went wrong. Please try again.');
  }
  return response.json();
};
