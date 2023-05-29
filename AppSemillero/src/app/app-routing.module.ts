import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./Home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'affiliates', loadChildren: () => import('./Affiliates/affiliates.module').then(m => m.AffiliatesModule)
  },
  {
    path: 'appoinments', loadChildren: () => import('./Appoinments/appoinments.module').then(m => m.AppoinmentsModule)
  },
  {
    path: 'tests', loadChildren: () => import('./c-tests/test.module').then(m => m.TestModule)
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
