import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { LightboxModule } from "ngx-lightbox";
import { ToastrModule } from "ngx-toastr";
import { alertComponent } from "src/app/common/alert.component";
import { CommonModules } from "src/app/common/common.module";
import { ServerService } from "src/app/Services/server.service";

import { TreeSelectModule } from "primeng/treeselect";
import { TabViewModule } from "primeng/tabview";
import { HistoryComponent } from "./history.component";

const routes:Routes = [{
  path:'',
  component:HistoryComponent,
  children: [
    {
      path: "parking-history",
      loadChildren: () =>
        import("../parking-history/parking-history.module").then(
          (m) => m.ParkingHistoryModule
        ),
    },
    {
      path: "no-parking-history",
      loadChildren: () =>
        import(
          "../no-parking-history/no-parking-history.module"
        ).then((m) => m.NoParkingHistoryModule),
    },
    {
      path: "traffic-jam-history",
      loadChildren: () =>
        import(
          "../traffic-jam-history/traffic-jam-history.module"
        ).then((m) => m.TrafficJamHistoryModule),
    },
  ]
}]



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    LightboxModule,
    TreeSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      toastComponent: alertComponent,
      progressBar: true,
      newestOnTop: true,
      tapToDismiss: true,
    }),
    TabViewModule,
    NgxDaterangepickerMd.forRoot({}),
    NgbModule,

  ],
  providers: [ServerService],
  entryComponents: [alertComponent],
  exports: [RouterModule],
})


export class HistoryModule { }
