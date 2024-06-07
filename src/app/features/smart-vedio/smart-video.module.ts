import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgChartsModule } from "ng2-charts";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { TreeSelectModule } from "primeng/treeselect";
import { CommonModules } from "src/app/common/common.module";
import { SmartVedioComponent } from "./smart-vedio.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { VideoModalComponent } from "src/app/common/video-modal/video-modal.component";

const routes:Routes=[{path:'',component:SmartVedioComponent}]
@NgModule({
    exports:[],
    imports:[CommonModules,RouterModule.forChild(routes), NgxDaterangepickerMd.forRoot({}),TreeSelectModule,NgScrollbarModule],
    declarations:[SmartVedioComponent,VideoModalComponent]
})

export class SmartVideoRecorderModule {

}