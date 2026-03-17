export const GITHUB_URL_PATTERN = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/;

export const isValidGithubUrl = (url) =>
  typeof url === 'string' && GITHUB_URL_PATTERN.test(url.trim());
