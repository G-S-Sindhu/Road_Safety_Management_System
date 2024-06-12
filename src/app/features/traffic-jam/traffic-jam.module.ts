import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrafficJamRoutingModule } from './traffic-jam-routing.module';
import { TrafficJamComponent } from './traffic-jam.component';
import { CommonModules } from 'src/app/common/common.module';


@NgModule({
  declarations: [
    TrafficJamComponent
  ],
  imports: [
    CommonModule,
    CommonModules,
    TrafficJamRoutingModule
  ]
})
export class TrafficJamModule { }
