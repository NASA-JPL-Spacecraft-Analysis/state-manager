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

  public createStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.post<StateVariable>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  /**
   * Takes the data from our uploaded file and tries to post it. Will be
   * rejected if there's duplicate identifiers.
   *
   * @param data Our parsed .csv data
   */
  public createStateVariables(data: Partial<StateVariable>[]): Observable<StateVariable[]> {
    return this.http.post<StateVariable[]>(
      baseUrl + '/state-variables',
      data
    );
  }

  public editStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.put<StateVariable>(
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
      baseUrl + '/state-variables'
    );
  }
}
