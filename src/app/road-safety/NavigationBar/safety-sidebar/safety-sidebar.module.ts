import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from 'src/app/common/common.module';
import { SafetySidebarComponent } from './safety-sidebar.component';



@NgModule({
  declarations: [SafetySidebarComponent],
  imports: [
    CommonModules,

  ]
})
export class SafetySidebarModule { }
