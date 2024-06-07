import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from 'src/app/common/common.module';
import { NoParkingHistoryComponent } from './no-parking-history.component';
import { RouterModule, Routes } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';

const routes:Routes = [{
  path:'',
  component:NoParkingHistoryComponent
}]

@NgModule({
  declarations: [NoParkingHistoryComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgScrollbarModule,
    NgxDaterangepickerMd,
    TreeSelectModule


  ]
})
export class NoParkingHistoryModule { }
