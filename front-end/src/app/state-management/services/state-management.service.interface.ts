import { Observable } from 'rxjs';

import { StateVariable } from '../models';

export interface StateManagementServiceInterface {
  createStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]>;
  editStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]>;
  getIdentifiers(baseUrl: string): Observable<string[]>;
  getStateVariables(baseUrl: string): Observable<StateVariable[]>;
}
