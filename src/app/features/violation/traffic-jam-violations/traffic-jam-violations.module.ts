import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TrafficJamViolationsComponent } from './traffic-jam-violations.component';
import { CommonModules } from 'src/app/common/common.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';

const routes:Routes = [{
  path:'',
  component:TrafficJamViolationsComponent
}]

@NgModule({
  declarations: [TrafficJamViolationsComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgxDaterangepickerMd,
    TreeSelectModule
  ]
})
export class TrafficJamViolationsModule { }
