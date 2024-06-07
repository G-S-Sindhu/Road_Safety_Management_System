import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CommonModules } from 'src/app/common/common.module';
import { CameraSettingsComponent } from './camera-settings.component';


const routes:Routes = [{
  path:'',
  component:CameraSettingsComponent
}]


@NgModule({
  declarations: [CameraSettingsComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes)
  ]
})
export class CameraSettingsModule { }
