import { config, ConfigState } from 'src/app/config';

const initialState: ConfigState = config;

export const reducer = (state: ConfigState = initialState): ConfigState => state;
