import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthServiceGuard} from './auth-service.guard'
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    loadChildren : './theme/auth/login/login.module#LoginModule'
  },
  {
    path: '',
    component: AdminComponent,
    canActivateChild : [AuthServiceGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'navigation',
        loadChildren: './theme/navigation/navigation.module#NavigationModule'
      },
      
      {
        path: 'basic',
        loadChildren: './theme/ui-elements/basic/basic.module#BasicModule'
      },
      {
        path: 'advance',
        loadChildren: './theme/ui-elements/advance/advance.module#AdvanceModule'
      },
      {
        path: 'animations',
        loadChildren: './theme/ui-elements/animation/animation.module#AnimationModule'
      },
      {
        path: 'forms',
        loadChildren: './theme/forms/forms.module#FormsModule'
      },
      {
        path: 'maintenance/error',
        loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      },
      {
        path: 'maintenance/coming-soon',
        loadChildren: './theme/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      },
      
      {
        path: 'crm-contact',
        loadChildren: './theme/crm-contact/crm-contact.module#CrmContactModule'
      },
      {
        path: 'invoice',
        loadChildren: './theme/extension/invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'file-upload-ui',
        loadChildren: './theme/extension/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      },
      {
        path: 'calendar',
        loadChildren: './theme/extension/event-calendar/event-calendar.module#EventCalendarModule'
      },
      {
        path: 'charts',
        loadChildren: './theme/chart/chart.module#ChartModule'
      },
      
      
      {
        path : 'list',
        loadChildren : './theme/masters/booklist/booklist.module#BooklistModule'
      },
      {
        path : 'listbrowser',
        loadChildren : './theme/browsers/list-browser/list-browser.module#ListBrowser'
      },
      {
        path : 'sale',
        loadChildren : './theme/masters/sale/sale.module#SaleModule'
      },
      {
        path : 'salebrowser',
        loadChildren : './theme/browsers/sale-browser/sale-browser.module#SaleBrowserModule'
      },
      {
        path : 'schallanbrowser',
        loadChildren : './theme/browsers/schallanbrowser/schallanbrowser.module#SchallanbrowserModule'
      },
      
      {
        path : 'saleorder',
        loadChildren : './theme/masters/newsaleorder/newsaleorder.module#NewsaleorderModule'
      },
      {
        path : 'salechallan',
        loadChildren : './theme/masters/salechallan/salechallan.module#SalechallanModule'
      },
      {
        path : 'labentry',
        loadChildren : './theme/masters/labentry/labentry.module#LabentryModule'
      },
      {
        path : 'labbrowser',
        loadChildren : './theme/browsers/labbrowser/labbrowser.module#LabbrowserModule'
      },
     
      {
        path: 'reports',
        loadChildren : './theme/reports/reports.module#ReportsModule'
      },
      {
        path : 'print',
        loadChildren : './theme/prints/prints.module#PrintsModule'
      },
      {
        path : 'ledgerbrowser',
        loadChildren : './theme/browsers/ledger-browsers/ledger-browsers.module#LedgerBrowsersModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './theme/auth/auth.module#AuthModule'
      },
      
      {
        path: 'maintenance/offline-ui',
        loadChildren: './theme/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
