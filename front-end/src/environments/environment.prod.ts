const windowBaseUrl = `${window.location.protocol}//${window.location.hostname}`;

declare global {
  interface Window {
    env;
  }
}

export const environment = {
  production: true,
  // eslint-disable-next-line @typescript-eslint/dot-notation
  apolloServerUrl: window['env']['apiURL'] || `${windowBaseUrl}:4000`,
  get apiPath(){
    return this.baseUrl + '/state-management/api/v1';
  }
};
