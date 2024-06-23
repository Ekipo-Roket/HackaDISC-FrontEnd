import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';

const routes: Routes = [{

  path:'',
  component: PrincipalComponent,
  children: [
    {
      path: 'dashboard',
      component:  VisualTableComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessManagerRoutingModule { }
