import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StateVariable } from '../models';
import { StateManagementServiceInterface } from './state-management.service.interface';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class StateManagementService implements StateManagementServiceInterface {
  constructor(private http: HttpClient) {}

  public createStateVariable(stateVariable: StateVariable): Observable<StateVariable[]> {
    return this.http.post<StateVariable[]>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public editStateVariable(stateVariable: StateVariable): Observable<StateVariable[]> {
    return this.http.put<StateVariable[]>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public getIdentifiers(): Observable<string[]> {
    return this.http.get<string[]>(
      baseUrl + '/state-identifiers'
    );
  }

  public getStateVariables(): Observable<StateVariable[]> {
    return this.http.get<StateVariable[]>(
      baseUrl + '/state-variable'
    );
  }
}
