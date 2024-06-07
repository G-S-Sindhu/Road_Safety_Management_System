import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from 'src/app/common/common.module';
import { ParkingHistoryComponent } from './parking-history.component';
import { RouterModule, Routes } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';

 
const routes:Routes = [{
  path:'',
  component:ParkingHistoryComponent
}]

@NgModule({
  declarations: [ParkingHistoryComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgScrollbarModule,
    NgxDaterangepickerMd,
    TreeSelectModule,
    OverlayPanelModule,
    CarouselModule
    
  ]
})
export class ParkingHistoryModule { }
