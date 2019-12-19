import { Observable } from 'rxjs';

import { StateVariable } from '../models';

export interface FileUploadServiceInterface {
  parseFile(file: File): Observable<Array<Partial<StateVariable>>>;
}
