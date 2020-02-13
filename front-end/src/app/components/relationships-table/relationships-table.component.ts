import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { RelationshipMap, Relationship } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-table',
  styleUrls: [ 'relationships-table.component.css' ],
  templateUrl: 'relationships-table.component.html'
})
export class RelationshipsTableComponent implements OnChanges {
  @Input() public relationships: RelationshipMap;

  public dataSource: MatTableDataSource<Relationship>;
  public relationshipsList: Relationship[];

  public ngOnChanges(): void {
    this.relationshipsList = [];

    if (this.relationships) {
      for (const key of Object.keys(this.relationships)) {
        this.relationshipsList.push(this.relationships[key]);
      }
    }

    this.dataSource = new MatTableDataSource(this.relationshipsList);
  }
}

@NgModule({
  declarations: [
    RelationshipsTableComponent
  ],
  exports: [
   RelationshipsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class RelationshipsTableModule {}
