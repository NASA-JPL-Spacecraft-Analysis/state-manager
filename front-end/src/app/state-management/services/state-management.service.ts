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

  public createStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]> {
    return this.http.post<StateVariable[]>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public editStateVariable(baseUrl: string, stateVariable: StateVariable): Observable<StateVariable[]> {
    return this.http.put<StateVariable[]>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public getStateVariables(baseUrl: string): Observable<Action> {
    return this.http.get<StateVariable[]>(baseUrl + '/state-variable').pipe(
      map(
        stateVariables => StateVariableActions.setStateVariables({ stateVariables })
      ),
      catchError(error => [
        StateVariableActions.fetchStateVariablesFailure({ error: new Error(error) })
      ])
    );
  }
}
