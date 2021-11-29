import { Routes } from '@angular/router';
//Layouts
import {
  BlankComponent,
  SimplyWhiteLayout,
} from './@pages/layouts';
import { AuthenticationGuard } from './Guards/authentication.guard';


export const AppRoutes: Routes = [
  {
    path: 'Home',
    data: {
      breadcrumb: 'Home'
    },
    component: SimplyWhiteLayout,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'Authentication',
    component: BlankComponent,
    loadChildren: './Layout/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'Proccess',
    data: {
      breadcrumb: 'Proccess'
    },
    component: SimplyWhiteLayout,
    loadChildren: './Layout/Proccess/proccess.module#ProccessModule'
  },
  {
    path: 'Report',
    data: {
      breadcrumb: 'Report'
    },
    component: SimplyWhiteLayout,
    loadChildren: './Layout/Report/report.module#ReportModule'
  },
  {
    path: 'Gamma',
    data: {
      breadcrumb: 'Gamma'
    },
    component: SimplyWhiteLayout,
    loadChildren: './Layout/Gamma/gamma.module#GammaModule'
  },
  {
    path: '', 
    data: {
      breadcrumb: 'Home'
    },
    component: SimplyWhiteLayout,
    canActivate: [AuthenticationGuard]
  }

];
