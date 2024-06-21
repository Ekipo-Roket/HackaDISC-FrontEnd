import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';
import { CompanyStatsComponent } from './pages/company-stats/company-stats.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: 'dashboard',
        component: VisualTableComponent
      },
      {
        path: 'company-stats/:id',
        component: CompanyStatsComponent
      },
      { path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
