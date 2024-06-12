import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbdSortableHeader } from './sortable.directive';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LightboxModule } from 'ngx-lightbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import FileSaver from 'file-saver';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { DateFormaterPipe } from './date-formater.pipe';
import { TimeTransformPipe } from './time-transform.pipe';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';



@NgModule({
  declarations: [
    // NgbdSortableHeader,
    DateFormaterPipe,
    TimeTransformPipe,
    FileUploaderComponent,
    BarChartComponent,
    LineChartComponent
  
  ],
  imports: [
    CommonModule,
    FormsModule,
  
   NgChartsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxImageZoomModule,NgMultiSelectDropDownModule.forRoot(),LightboxModule
    
   ],
   exports:[
    FileUploaderComponent,
    DateFormaterPipe,
    TimeTransformPipe,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    NgxImageZoomModule,
    BarChartComponent,
    NgMultiSelectDropDownModule,LightboxModule,
    FormsModule,
    NgbModule,
    LineChartComponent
   
            
            ]

            
})
export class CommonModules { 
  constructor(lib: FaIconLibrary) {
   lib.addIconPacks(fas);
}
}