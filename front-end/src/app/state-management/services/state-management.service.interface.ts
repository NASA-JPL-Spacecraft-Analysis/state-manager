import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { StateVariable } from '../models';

export interface StateManagementServiceInterface {
  createNewStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]>;
  getStateVariables(baseUrl: string): Observable<Action>;
}
