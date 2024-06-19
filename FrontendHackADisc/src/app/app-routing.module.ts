import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path:'',
    component: AppComponent,
    pathMatch:'full',
  },
  {
    path:'**',
    redirectTo: '',
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path:'area',
    loadChildren: () => import('./area-manager/area-manager.module').then(m => m.AreaManagerModule),
  },
  {
    path:'business',
    loadChildren: () => import('./business-manager/business-manager.module').then(m => m.BusinessManagerModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
