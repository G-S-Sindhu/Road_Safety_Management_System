import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

import { ServerService } from 'src/app/Services/server.service';
import { AuthGuard } from 'src/app/Services/auth.guard';
import { CommonModules } from 'src/app/common/common.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { TabViewModule } from 'primeng/tabview';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes:Routes = [{
  path:'',
  component:DashboardComponent,
  children: [
    {
      path: "dashboard-parking",
      loadChildren: () =>
        import("../dashboard-parking/dashboard-parking.module").then(
          (m) => m.DashboardParkingModule
        ),
    },
    {
      path: "dashboard-traffic_jam",
      loadChildren: () =>
        import(
          "../dashboard-traffic-jam/dashboard-traffic-jam.module"
        ).then((m) => m.DashboardTrafficJamModule),
    },
  ]
}]



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    TabViewModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
 

   
  ],
  exports:[RouterModule],

    providers:
     [ServerService, 
      DatePipe, 
      AuthGuard,  
    ],
})
export class DashboardModule { }
