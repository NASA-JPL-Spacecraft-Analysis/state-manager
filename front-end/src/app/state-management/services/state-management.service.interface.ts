import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { StateVariable } from '../models';

export interface StateManagementServiceInterface {
  createNewStateVariable(stateVariable: StateVariable): Observable<StateVariable[]>;
  getStateVariables(): Observable<Action>;
}
