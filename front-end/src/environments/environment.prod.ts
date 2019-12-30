const windowBaseUrl = `${window.location.protocol}//${window.location.hostname}`;

export const environment = {
  production: true,
  baseUrl: `${windowBaseUrl}:8080/state-management/api/v1`
};
