import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PartyreportComponent } from './partyreport.component'

const routes: Routes = [
  {
    path: '',
    component: PartyreportComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyreportRoutingModule { }
