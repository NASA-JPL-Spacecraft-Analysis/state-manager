export const environment = {
  apolloServerUrl: 'http://localhost:4000',
  production: false,
  baseUrl: 'http://localhost:8080',
  get apiPath(){
    return this.baseUrl + '/state-management/api/v1';
  }
};
