import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VisualTableComponent } from '../area-manager/components/visual-table/visual-table.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessManagerRoutingModule
  ]
})
export class BusinessManagerModule { }
