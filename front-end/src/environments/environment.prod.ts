const windowBaseUrl = `${window.location.protocol}//${window.location.hostname}`;

declare global {
  interface Window {
    env;
  }
}

export const environment = {
  production: true,
  baseUrl: window.env.apiURL || `${windowBaseUrl}:8080`,
  get apiPath(){
    return this.baseUrl + '/state-management/api/v1';
  }
};
