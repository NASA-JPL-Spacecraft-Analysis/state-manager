import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StateVariable } from '../models';
import { map, catchError } from 'rxjs/operators';
import { StateVariableActions } from '../actions';
import { StateManagementServiceInterface } from './state-management.service.interface';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService implements StateManagementServiceInterface {
  constructor(private http: HttpClient) {}

  public createNewStateVariable(stateVariable: StateVariable): Observable<StateVariable[]> {
    return this.http.post<StateVariable[]>(
      'http://localhost:8080/state-management/api/v1/state-variable',
      stateVariable
    );
  }

  public getStateVariables(): Observable<Action> {
    return this.http.get<StateVariable[]>('http://localhost:8080/state-management/api/v1/state-variable').pipe(
      map(
        stateVariables => StateVariableActions.setStateVariables({ stateVariables })
      ),
      catchError(error => [
        StateVariableActions.fetchStateVariablesFailure({ error: new Error(error) })
      ])
    );
  }
}
