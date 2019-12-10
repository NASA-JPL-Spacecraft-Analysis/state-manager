import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { StateVariable } from '../models';

export interface StateManagementServiceInterface {
  createStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]>;
  editStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]>;
  getStateVariables(baseUrl: string): Observable<Action>;
}
