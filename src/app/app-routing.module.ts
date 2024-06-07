import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RoiSettingsComponent } from "./features/roi-settings/roi-settings.component";
import { HomeComponent } from "./home/home.component";

import { AuthGuard } from "./Services/auth.guard";
import { AuthGuardLogin } from "./Services/authLogin.guard";
import { SelectionPageComponent } from "./selection-page/selection-page.component";
import { SafetyHomeComponent } from "./road-safety/safety-home/safety-home.component";


const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  { path: "app/Home", component: HomeComponent },
  {
    path: "app",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "violations",
        loadChildren: () =>
          import("./features/violation/log-history/logHistory.module").then(
            (m) => m.LogHistoryModule
          ),
      },

      {
        path: "WaterColorChange",
        loadChildren: () =>
          import(
            "./features/water-color-change/water-color-change.module"
          ).then((m) => m.WaterColorModule),
      },
      {
        path: "reportSettings",
        loadChildren: () =>
          import("./settings/report-alert/report-alert.module").then(
            (m) => m.ReportAlertModule
          ),
      },

      {
        path: "dashboard",
        loadChildren: () =>
          import("./features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "smartVideoRecorder",
        loadChildren: () =>
          import("./features/smart-vedio/smart-video.module").then(
            (m) => m.SmartVideoRecorderModule
          ),
      },
      {
        path: "trafficCount",
        loadChildren: () =>
          import(
            "./features/violation/traffic-count/traffic-count.module"
          ).then((m) => m.TrafficCountModule),
      },

      {
        path: "panelViolation",
        loadChildren: () =>
          import("./features/panel-violations/panel-violations.module").then(
            (m) => m.PanelViolationsModule
          ),
      },
      {
        path: "CameraSettings",
        loadChildren: () =>
          import("./settings/camera-settings/camera-settings.module").then(
            (m) => m.CameraSettingsModule
          ),
      },
      {
        path: "ROISettings",
        loadChildren: () =>
          import("./settings/camera-roi/camera-roi.module").then(
            (m) => m.CameraRoiModule
          ),
      },
      {
        path: "panelROISettings",
        loadChildren: () =>
          import("./features/roi-settings/roi-settings.module").then(
            (m) => m.ROIEditModule
          ),
      },

      {
        path: "jobsheetUpload",
        loadChildren: () =>
          import("./features/job-sheet-upload/job-sheet-upload.module").then(
            (m) => m.JobsheetUploadModule
          ),
      },
      {
        path: "rackEdit",
        loadChildren: () =>
          import("./features/rack-edit/rack-edit.module").then(
            (m) => m.RackEditModule
          ),
      },
      {
        path: "jobsheetMoniter",
        loadChildren: () =>
          import("./features/esi-moniter/esi-monitor.module").then(
            (m) => m.ESIMonitorModule
          ),
      },
      {
        path: "jobsheetViolation",
        component: RoiSettingsComponent,
      },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    canActivate: [AuthGuardLogin],
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "ppeViolations",
    loadChildren: () =>
      import("./features/violation/ppeviolation/ppeviolation.module").then(
        (m) => m.PpeviolationModule
      ),
  },
  {
    path: "CrowdCountViolations",
    loadChildren: () =>
      import(
        "./features/violation/crowd-count-violations/crowd-count-violations.module"
      ).then((m) => m.CrowdCountViolationsModule),
  },

  { path: "road-safety/safety-home", component: SafetyHomeComponent },
  { path: "app/selection-page", component: SelectionPageComponent },

  {
    path: "road-safety",
    component: SafetyHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./road-safety/Dashboard/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: "history",
        loadChildren: () =>
          import("./road-safety/History/history/history.module").then(
            (m) => m.HistoryModule
          ),
      },
      {
        path: "camera-settings",
        loadChildren: () =>
          import("./road-safety/Camera-Setup/camera-settings/camera-settings.module").then(
            (m) => m.CameraSettingsModule
          ),
      },
      {
        path: "camera-roi",
        loadChildren: () =>
          import("./road-safety/Camera-Setup/camera-roi/camera-roi.module").then(
            (m) => m.CameraRoiModule
          ),
      },
      {
        path:"parking-history",
        loadChildren:() =>
        import("./road-safety/History/parking-history/parking-history.module").then( 
          (m) => m.ParkingHistoryModule)
      },
      {
        path:"no-parking-history",
        loadChildren:() =>
        import("./road-safety/History/no-parking-history/no-parking-history.module").then 
        ( (m) => m.NoParkingHistoryModule)
      }
    ],

  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
