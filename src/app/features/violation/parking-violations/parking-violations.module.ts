import { NgModule } from '@angular/core';
import { CommonModules } from 'src/app/common/common.module';
import { RouterModule, Routes } from '@angular/router';
import { ParkingViolationsComponent } from './parking-violations.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';

const routes:Routes = [{
  path:'',
  component:ParkingViolationsComponent
}]

@NgModule({
  declarations: [ParkingViolationsComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgxDaterangepickerMd,
    TreeSelectModule,
  ],
  
})
export class ParkingViolationsModule { }
