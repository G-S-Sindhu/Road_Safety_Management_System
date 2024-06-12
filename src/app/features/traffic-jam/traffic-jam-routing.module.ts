import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficJamComponent } from './traffic-jam.component';

const routes: Routes = [{ path: '', component: TrafficJamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficJamRoutingModule { }
