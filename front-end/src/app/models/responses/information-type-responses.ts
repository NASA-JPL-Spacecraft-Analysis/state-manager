import { InformationType } from '../information-type';
import { Response } from './response';

export type CreateInformationTypesResponse = Response & { informationTypes: InformationType[] };
