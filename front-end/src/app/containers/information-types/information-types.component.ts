import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { InformationTypeMap, InformationType, informationTypes } from 'src/app/models';
import { getInformationTypes, getIsLoading, getSelectedCollectionId } from 'src/app/selectors';
import { LayoutActions } from 'src/app/actions';
import { InformationTypeTableModule } from 'src/app/components';
import { UploadConstants } from 'src/app/constants';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-information-types',
  styleUrls: ['information-types.component.css'],
  templateUrl: 'information-types.component.html'
})
export class InformationTypesComponent implements OnDestroy {
  public informationTypes: InformationType[];
  public informationTypeMap: InformationTypeMap;
  public isLoading: boolean;

  private collectionId: string;
  private subscriptions = new SubSink();

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef) {
    this.subscriptions.add(
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe((collectionId) => {
        this.collectionId = collectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypes)).subscribe((loadedInformationTypes) => {
        this.informationTypes = loadedInformationTypes;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.collectionId,
        csvFormat: [UploadConstants.informationTypeCsvUploadFormat],
        dialogType: 'Information Type',
        jsonFormat: UploadConstants.informationTypeJsonUploadFormat,
        types: informationTypes
      })
    );
  }
}

@NgModule({
  declarations: [InformationTypesComponent],
  exports: [InformationTypesComponent],
  imports: [CommonModule, InformationTypeTableModule, LoadingModule]
})
export class InformationTypesModule {}
