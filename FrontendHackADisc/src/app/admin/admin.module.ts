import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';
import { FormsModule } from '@angular/forms';
import { CompanyStatsComponent } from './pages/company-stats/company-stats.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    VisualTableComponent,
    CompanyStatsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
