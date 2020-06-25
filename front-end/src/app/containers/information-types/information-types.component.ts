import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { InformationTypesMap } from 'src/app/models';
import { getInformationTypes, getSelectedCollectionId } from 'src/app/selectors';
import { InformationTypesTableModule } from 'src/app/components/information-types-table/information-types-table.component';
import { FileUploadActions, ToastActions } from 'src/app/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'information-types',
  styleUrls: [ 'information-types.component.css' ],
  templateUrl: 'information-types.component.html'
})
export class InformationTypesComponent implements OnDestroy {
  public informationTypesMap: InformationTypesMap;

  private collectionId: number;
  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getSelectedCollectionId)).subscribe(collectionId => {
        this.collectionId = collectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypes)).subscribe(informationTypesMap => {
        this.informationTypesMap = informationTypesMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (file && (fileType === 'csv' || fileType === 'json')) {
      this.store.dispatch(FileUploadActions.uploadInformationTypes({
        file,
        fileType,
        collectionId: this.collectionId
      }));
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: 'Wrong filetype supplied, only csv is supported.',
        toastType: 'error'
      }));
    }
  }
}

@NgModule({
  declarations: [
    InformationTypesComponent
  ],
  exports: [
    InformationTypesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InformationTypesTableModule
  ]
})
export class InformationTypesModule {}
