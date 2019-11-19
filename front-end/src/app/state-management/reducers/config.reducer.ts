import { config, ConfigState } from 'src/app/config';

const initialState: ConfigState = config;

export function reducer(
  state: ConfigState = initialState
): ConfigState {
  return state;
}
