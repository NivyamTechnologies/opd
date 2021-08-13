import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms Components',
      status: false
    },
    children: [
      
      {
        path: 'item',
        loadChildren: './item/item.module#ItemModule'
      },
      {
        path: 'itemreport',
        loadChildren: './itemreport/itemreport.module#ItemreportModule'
      },
     
      {
        path: 'party',
        loadChildren: './party/party.module#PartyModule'
      },
      {
        path: 'partyreport',
        loadChildren: './partyreport/partyreport.module#PartyreportModule'
      },
     
      
      {
        path : 'accountledger',
        loadChildren : './accountledger/accountledger.module#AccountledgerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
