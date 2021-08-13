import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabentryComponent } from './labentry.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : LabentryComponent,

}]

@NgModule({
  declarations: [LabentryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,

    RouterModule.forChild(routes)
  ],

  exports : [RouterModule]
})
export class LabentryModule { }
