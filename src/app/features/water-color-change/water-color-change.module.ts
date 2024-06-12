import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { LightboxModule } from "ngx-lightbox";
import { ToastrModule } from "ngx-toastr";
import { TreeSelectModule } from "primeng/treeselect";
import { alertComponent } from "src/app/common/alert.component";
import { CommonModules } from "src/app/common/common.module";
import { ServerService } from "src/app/Services/server.service";
import { WaterColorChangeComponent } from "./water-color-change.component";
const routes:Routes=[{path:'',component:WaterColorChangeComponent}]


@NgModule({
    declarations:[WaterColorChangeComponent],
    imports:[CommonModules, RouterModule.forChild(routes),LightboxModule,TreeSelectModule,
        NgMultiSelectDropDownModule.forRoot(),ToastrModule.forRoot({
            timeOut: 2000000,
            toastComponent: alertComponent,
            progressBar: true,
            newestOnTop: true,
          }),
          
          NgxDaterangepickerMd.forRoot({}),
          NgbModule],
          providers:[ServerService],
          entryComponents:[alertComponent],
    exports:[RouterModule]
})


export class WaterColorModule{
    
}