import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabbrowserComponent } from './labbrowser.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : LabbrowserComponent,

}]

@NgModule({
  declarations: [LabbrowserComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class LabbrowserModule { }
