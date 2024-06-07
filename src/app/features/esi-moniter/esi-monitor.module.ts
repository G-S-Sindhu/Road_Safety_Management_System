import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { CommonModules } from "src/app/common/common.module";
import { AuthGuard } from 'src/app/Services/auth.guard';
import { ServerService } from 'src/app/Services/server.service';
import { ESIMoniterComponent } from "./esi-moniter.component";

const routes:Routes=[{path:'',component:ESIMoniterComponent}];

@NgModule({
    declarations:[ESIMoniterComponent],
    imports:[CommonModules,RouterModule.forChild(routes),    NgbModule,
  ],
    exports:[RouterModule],
    providers: [ServerService, DatePipe, AuthGuard],


})

export class ESIMonitorModule{

}