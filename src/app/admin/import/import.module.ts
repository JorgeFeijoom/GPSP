import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { ImportRoutingModule } from './import-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ImportRoutingModule,
    SharedModule
  ],
  declarations: [ImportCsvComponent]
})
export class ImportModule { }
