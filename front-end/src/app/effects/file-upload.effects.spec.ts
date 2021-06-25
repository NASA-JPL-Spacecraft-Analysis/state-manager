import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FileUploadEffects } from './file-upload.effects';
import {
  CollectionService,
  EventService,
  InformationTypeService,
  MockCollectionService,
  MockEventService,
  MockInformationTypesService,
  MockRelationshipService,
  MockStateService,
  MockParseService,
  MockValidationService,
  ParseService,
  RelationshipService,
  StateService,
  ValidationService
} from '../services';
import { FileUploadActions, StateActions, ToastActions } from '../actions';
import {
  mockCsvFile,
  mockJsonFile,
  mockInformationTypes,
  mockStateEnumerationUploads,
  mockStateEnumerations,
  mockStates
} from '../mocks';

describe('FileUploadEffects', () => {
  let actions: Observable<Action>;
  let effects: FileUploadEffects;
  let testScheduler: TestScheduler;
  let collectionService: CollectionService;
  let eventService: EventService;
  let informationTypeService: InformationTypeService;
  let parseService: ParseService;
  let relationshipService: RelationshipService;
  let stateService: StateService;
  let validationService: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FileUploadEffects,
        provideMockActions(() => actions),
        {
          provide: CollectionService,
          useValue: new MockCollectionService()
        },
        {
          provide: EventService,
          useValue: new MockEventService()
        },
        {
          provide: InformationTypeService,
          useValue: new MockInformationTypesService()
        },
        {
          provide: ParseService,
          useValue: new MockParseService()
        },
        {
          provide: RelationshipService,
          useValue: new MockRelationshipService()
        },
        {
          provide: StateService,
          useValue: new MockStateService()
        },
        {
          provide: ValidationService,
          useValue: new MockValidationService()
        }
      ]
    });

    collectionService = TestBed.inject(CollectionService);
    eventService = TestBed.inject(EventService);
    informationTypeService = TestBed.inject(InformationTypeService);
    parseService = TestBed.inject(ParseService);
    relationshipService = TestBed.inject(RelationshipService);
    stateService = TestBed.inject(StateService);
    validationService = TestBed.inject(ValidationService);
    actions = TestBed.inject(Actions);
    effects = TestBed.inject(FileUploadEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
  describe('uploadInformationTypes', () => {
    it('should dispatch uploadInformationTypesSuccess and show a success toast on success when a .csv file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        parseService.parseFile = jasmine.createSpy().and.returnValue(of([ ...mockInformationTypes ]));

        const action = FileUploadActions.uploadInformationTypes({
          file: mockCsvFile,
          collectionId: 1
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadInformationTypes).toBe('-(bc)', {
          b: FileUploadActions.uploadInformationTypesSuccess({
            informationTypes: mockInformationTypes
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
    it('should dispatch saveEnumerationsSuccess and show a success toast when enumerations are uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        parseService.parseFile = jasmine.createSpy().and.returnValue(of([ ...mockStateEnumerationUploads ]));

        const action = FileUploadActions.uploadStateEnumerations({
          file: mockJsonFile,
          collectionId: 1
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadEnumerations).toBe('-(bc)', {
          b: StateActions.saveEnumerationsSuccess({
            enumerations: mockStateEnumerations,
            stateId: 1
          }),
          c: ToastActions.showToast({
            message: 'Enumerations uploaded',
            toastType: 'success'
          })
        });
      });
    });
  });

  describe('uploadStates', () => {
    it('should dispatch uploadStatesSuccess and show a success toast when a state .csv file is uploaded', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        parseService.parseFile = jasmine.createSpy().and.returnValue(of([ ...mockStates ]));

        const action = FileUploadActions.uploadStates({
          file: mockCsvFile,
          collectionId: 1
        });

        actions = hot('-a', { a: action });

        expectObservable(effects.uploadStates).toBe('-(bc)', {
          b: StateActions.createStatesSuccess({
            states: [ ...mockStates ]
          }),
          c: ToastActions.showToast({
            message: 'State(s) uploaded',
            toastType: 'success'
          })
        });
      });
    });
  });
  */
});
