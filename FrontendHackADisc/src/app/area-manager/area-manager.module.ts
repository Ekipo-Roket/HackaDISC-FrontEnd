import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaManagerRoutingModule } from './area-manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AreaManagerRoutingModule
  ]
})
export class AreaManagerModule { }
