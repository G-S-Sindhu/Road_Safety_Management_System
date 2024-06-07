import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonModules } from 'src/app/common/common.module';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { DashboardParkingComponent } from './dashboard-parking.component';
import { ServerService } from 'src/app/Services/server.service';
import { AuthGuard } from 'src/app/Services/auth.guard';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'src/app/common/charts/charts.module';


 const routes:Routes=[{
  path:'',
  component: DashboardParkingComponent
}]




 
@NgModule({

  declarations: [
    DashboardParkingComponent
  ],

  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    RouterOutlet,
    CanvasJSAngularChartsModule,
    ChartsModule,
  ],

  exports:[
    RouterModule
  ],

  providers:[
    ServerService,
    AuthGuard,
    DatePipe
  ]
})
export class DashboardParkingModule { }
