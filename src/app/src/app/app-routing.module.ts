import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ErrorComponent } from './modules/pages/error/error.component';
import { StationsComponent } from './modules/stations/stations/stations.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/stations/stations.module').then((m) => m.StationsModule),
    // canActivateChild: [MsalGuard],
  },
  // {
  //   path: 'error',
  //   component: ErrorComponent
  // },
  // {
  //   path: '**',
  //   component: ErrorComponent
  // },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }