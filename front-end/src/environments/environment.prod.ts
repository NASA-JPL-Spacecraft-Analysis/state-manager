const windowBaseUrl = `${window.location.protocol}//${window.location.hostname}`;

declare global {
  interface Window {
    env;
  }
}

export const environment = {
  production: true,
  apolloServerUrl: window["env"]["apiURL"] || `${windowBaseUrl}:4000`,
  get apiPath(){
    return this.baseUrl + '/state-management/api/v1';
  }
};
