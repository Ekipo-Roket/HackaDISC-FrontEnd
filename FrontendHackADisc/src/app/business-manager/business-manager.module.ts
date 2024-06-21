import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VisualTableComponent } from './components/visual-table/visual-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrincipalComponent,
    VisualTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessManagerRoutingModule,
    FormsModule
  ]
})
export class BusinessManagerModule { }
