import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { LightboxModule } from "ngx-lightbox";
import { ToastrModule } from "ngx-toastr";

import { TreeSelectModule } from 'primeng/treeselect';
import { TabViewModule } from "primeng/tabview";
import { LogHistoryComponent } from "../violation/log-history/log-history.component";
import { CommonModules } from "src/app/common/common.module";
import { alertComponent } from "src/app/common/alert.component";
import { ServerService } from "src/app/Services/server.service";

const routes:Routes=[{path:'',component:LogHistoryComponent,children:[
    { path: 'ppe', loadChildren: () => import('../violation/ppeviolation/ppeviolation.module').then(m => m.PpeviolationModule) },
    { path: 'CrowdCount', loadChildren: () => import('../violation/crowd-count-violations/crowd-count-violations.module').then(m => m.CrowdCountViolationsModule) },
    { path: 'DangerZone', loadChildren: () => import('../violation/ra-violations/ra-violations.module').then(m => m.RaViolationsModule) }
]}
]

@NgModule({
    declarations:[LogHistoryComponent],
    imports:[CommonModules, RouterModule.forChild(routes),LightboxModule,TreeSelectModule,
        NgMultiSelectDropDownModule.forRoot(),ToastrModule.forRoot({
            timeOut: 5000,
            toastComponent: alertComponent,
            progressBar: true,
            newestOnTop: true,
            tapToDismiss:false
          }),
          TabViewModule,
          NgxDaterangepickerMd.forRoot({}),
          NgbModule],
          providers:[ServerService],
          entryComponents:[alertComponent],
    exports:[RouterModule]

})

export class LogHistoryModule{
    
}