import { environment } from './../environments/environment';

export interface ConfigState {
  app: {
    apiPath: string;
  };
}

export const config: ConfigState = {
  app: {
    apiPath: environment.apiPath
  }
};
