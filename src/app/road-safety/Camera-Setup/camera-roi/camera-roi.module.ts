import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraRoiComponent } from './camera-roi.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModules } from 'src/app/common/common.module';
import { TabViewModule } from 'primeng/tabview';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';

const routes:Routes = [{
  path:'',
  component:CameraRoiComponent

}]


@NgModule({
  declarations: [CameraRoiComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    TabViewModule,
    NgxDaterangepickerMd,
    FormsModule
    

  ],

  exports:[RouterModule]
})
export class CameraRoiModule { }
