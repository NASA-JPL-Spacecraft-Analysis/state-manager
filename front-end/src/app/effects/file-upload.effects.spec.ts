import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FileUploadEffects } from './file-upload.effects';
import { StateManagementService } from '../services/state-management.service';
import { MockStateManagementService } from '../services/mock-state-management.service';
import { FileUploadActions, ToastActions } from '../actions';
import { mockCsvFile, mockJsonFile, mockInformationTypesMap, stateEnumerationMap, stateVariableMap } from '../mocks';

describe('FileUploadEffects', () => {
  let actions: Observable<Action>;
  let effects: FileUploadEffects;
  let testScheduler: TestScheduler;
  let stateManagementService: StateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        FileUploadEffects,
        provideMockActions(() => actions),
        {
          provide: StateManagementService,
          useValue: new MockStateManagementService()
        }
      ]
    });

    stateManagementService = TestBed.inject(StateManagementService);
    actions = TestBed.inject(Actions);
    effects = TestBed.inject(FileUploadEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('uploadInformationTypes', () => {
    it('should dispatch uploadInformationTypesSuccess and show a success toast on success when a .csv file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = FileUploadActions.uploadInformationTypes({
          file: mockCsvFile,
          fileType: 'csv'
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadInformationTypes).toBe('-(bc)', {
          b: FileUploadActions.uploadInformationTypesSuccess({
            informationTypes: mockInformationTypesMap
          }),
          c: ToastActions.showToast({
            message: 'Information types uploaded',
            toastType: 'success'
          })
        });
      });
    });
  });

  describe('uploadEnumerations', () => {
    it('should dispatch uploadEnumerationsSuccess and show a success toast when a .csv file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = FileUploadActions.uploadEnumerations({
          file: mockCsvFile,
          fileType: 'csv'
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadEnumerations).toBe('-(bc)', {
          b: FileUploadActions.uploadEnumerationsSuccess({
            enumerations: stateEnumerationMap
          }),
          c: ToastActions.showToast({
            message: 'Enumerations uploaded',
            toastType: 'success'
          })
        });
      });
    });

    it('should dispatch uploadEnumerationsSuccess and show a success toast when a .json file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = FileUploadActions.uploadEnumerations({
          file: mockJsonFile,
          fileType: 'json'
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadEnumerations).toBe('-(bc)', {
          b: FileUploadActions.uploadEnumerationsSuccess({
            enumerations: stateEnumerationMap
          }),
          c: ToastActions.showToast({
            message: 'Enumerations uploaded',
            toastType: 'success'
          })
        });
      });
    });
  });

  describe('uploadStateVariables', () => {
    it('should dispatch uploadStateVariablesSuccess and show a success toast when a .csv file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = FileUploadActions.uploadStateVariables({
          file: mockCsvFile,
          fileType: 'csv'
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadStateVariables).toBe('-(bc)', {
          b: FileUploadActions.uploadStateVariablesSuccess({
            stateVariableMap
          }),
          c: ToastActions.showToast({
            message: 'State variable(s) uploaded',
            toastType: 'success'
          })
        });
      });
    });

    it('should dispatch uploadStateVariablesSuccess and show a success toast when a .json file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = FileUploadActions.uploadStateVariables({
          file: mockJsonFile,
          fileType: 'json'
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadStateVariables).toBe('-(bc)', {
          b: FileUploadActions.uploadStateVariablesSuccess({
            stateVariableMap
          }),
          c: ToastActions.showToast({
            message: 'State variable(s) uploaded',
            toastType: 'success'
          })
        });
      });
    });
  });
});
