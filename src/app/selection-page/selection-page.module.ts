import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { SelectionPageComponent } from './selection-page.component';

const routes:Routes =[{
  path:'',
  component:SelectionPageComponent
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SelectionPageModule { }
