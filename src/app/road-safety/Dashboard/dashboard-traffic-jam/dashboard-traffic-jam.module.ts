import { NgModule } from '@angular/core';
import { CommonModules } from 'src/app/common/common.module';
import { DashboardTrafficJamComponent } from './dashboard-traffic-jam.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:DashboardTrafficJamComponent
}]

@NgModule({
  declarations: [
    DashboardTrafficJamComponent
  ],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    

  ],

  exports:[
    RouterModule
  ]

  
})
export class DashboardTrafficJamModule { }
