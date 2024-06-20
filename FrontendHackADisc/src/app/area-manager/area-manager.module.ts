import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaManagerRoutingModule } from './area-manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    VisualTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AreaManagerRoutingModule
  ]
})
export class AreaManagerModule { }
