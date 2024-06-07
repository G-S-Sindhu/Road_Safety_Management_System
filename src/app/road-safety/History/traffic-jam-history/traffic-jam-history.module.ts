import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { TrafficJamHistoryComponent } from './traffic-jam-history.component';
import { CommonModules } from 'src/app/common/common.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';

const routes:Routes = [{
  path:'',
  component:TrafficJamHistoryComponent
}]

@NgModule({
  declarations: [TrafficJamHistoryComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgxDaterangepickerMd,
    TreeSelectModule
  ]
})
export class TrafficJamHistoryModule { }
