import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CollectionComponent } from './collections.component';
import { mockCollectionMap } from 'src/app/mocks';
import { MaterialModule } from 'src/app/material';

describe('CollectionsComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let mockStore: MockStore;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    url: '/states'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionComponent
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            collection: {
              collectionMap: { ...mockCollectionMap },
              selectedCollectionId: 1
            }
          }
        }),
        { provide: Router, useValue: mockRouter }
      ],
    });

    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  describe('onCollectionChange()', () => {
    it('should navigate when a collection is selected', () => {
      component.onCollectionChange(1);

      expect(mockRouter.navigate).toHaveBeenCalledWith([ 'collection/1/states' ]);
    });
  });

  describe('onCreateNewCollection()', () => {
    it('should set selectedCollectionId and toggle editing when a new collection is created', () => {
      component.onCreateNewCollection();

      expect(component.selectedCollectionId).toEqual(null);
      expect(component.editing).toBeTruthy();
    });
  });

  describe('onDeleteCollection()', () => {
    it('should set deleting when a collection is deleted', () => {
      component.onDeleteCollection();

      expect(component.deleting).toBeTruthy();

      setTimeout(() => {
        expect(component.deleting).toBeFalsy();
      });
    });
  });

  describe('onEditCollection()', () => {
    it('should toggle editing when a collection is edited', () => {
      component.onEditCollection();

      expect(component.editing).toBeTruthy();
    });
  });
});
