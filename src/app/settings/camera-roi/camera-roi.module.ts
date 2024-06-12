import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import 'fabric'
import { CameraRoiComponent } from "./camera-roi.component";
const routes:Routes=[{path:'',component:CameraRoiComponent}]
import { TreeSelectModule } from 'primeng/treeselect';
import { MenubarModule } from 'primeng/menubar';
import { NgScrollbarModule } from "ngx-scrollbar";
import { TabViewModule } from "primeng/tabview";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import {  SliderModule } from "primeng/slider";
import { ChipsModule } from "primeng/chips";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({

    declarations:[
        CameraRoiComponent
    ],

    imports:[
        CommonModules,
        RouterModule.forChild(routes),
        TreeSelectModule,MenubarModule,
        NgScrollbarModule,
        TreeSelectModule,
        MenubarModule,
        TabViewModule,
        NgxDaterangepickerMd,
        SliderModule,
        ChipsModule,
        NgbTimepickerModule
    ],

    exports:[
        RouterModule
    ],
    
})

export class CameraRoiModule{

}