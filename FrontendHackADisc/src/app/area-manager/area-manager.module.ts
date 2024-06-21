import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaManagerRoutingModule } from './area-manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';
import { FormsModule } from '@angular/forms';
import { EvaluationsCardComponent } from './components/evaluations-card/evaluations-card.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { CardListComponent } from './components/card-list/card-list.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    VisualTableComponent,
    EvaluationsCardComponent,
    EvaluationsComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AreaManagerRoutingModule,
    FormsModule
  ]
})
export class AreaManagerModule { }
