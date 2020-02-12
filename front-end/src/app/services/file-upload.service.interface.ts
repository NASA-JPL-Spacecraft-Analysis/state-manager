import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

export interface FileUploadServiceInterface {
  parseFile(file: File): Observable<Action>;
}
