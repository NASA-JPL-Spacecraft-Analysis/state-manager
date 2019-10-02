import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TestString } from './../models';
import { map, catchError } from 'rxjs/operators';
import { DataActions } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  public createNewData(data: string): Observable<Array<TestString>> {
    return this.http.post<Array<TestString>>(
      'http://localhost:8080/fspa-proto-app/api/v1/data',
      data
    );
  }

  public getData(): Observable<Action> {
    return this.getDataHttp().pipe(
      map(
        data => DataActions.setData({ data })
      ),
      catchError(error => [
        DataActions.fetchDataFailure({ error: new Error(error) })
      ])
    );
  }

  private getDataHttp(): Observable<Array<TestString>> {
    return this.http.get<Array<TestString>>('http://localhost:8080/fspa-proto-app/api/v1/test');
  }
}
