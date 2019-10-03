import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { TestString } from '../models';

export interface DataServiceInterface {
  createNewData(data: string): Observable<TestString[]>;
  getData(): Observable<Action>;
}
