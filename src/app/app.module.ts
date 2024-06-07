import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { faBridgeCircleCheck, fas } from "@fortawesome/free-solid-svg-icons";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./NavigationBar/header/header.component";
import { SidebarComponent } from "./NavigationBar/sidebar/sidebar.component";
import { JobSheetUploadComponent } from "./features/job-sheet-upload/job-sheet-upload.component";
import { ESIMoniterComponent } from "./features/esi-moniter/esi-moniter.component";
import { FooterComponent } from "./NavigationBar/footer/footer.component";
import { NgbCarouselModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServerService } from "./Services/server.service";
import { ToastrModule } from "ngx-toastr";
import { DatePipe } from "@angular/common";

import { AuthGuard } from "./Services/auth.guard";
import { alertComponent } from "./common/alert.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  DaterangepickerDirective,
  NgxDaterangepickerMd,
} from "ngx-daterangepicker-material";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import "fabric";
import * as CanvasJSAngularChart from "../assets/canvasjs/canvasjs.angular.component";

import { NgChartsConfiguration, NgChartsModule } from "ng2-charts";
import { NgScrollbarModule } from "ngx-scrollbar";
import { AlertSettingsComponent } from "./settings/alert-settings/alert-settings.component";
import { SmartVedioService } from "./features/smart-vedio/smartVideo.service";
import { ConfigarationComponent } from "./settings/configaration/configaration.component";
import { Header } from "primeng/api";

import { SafetyFooterComponent } from './road-safety/NavigationBar/safety-footer/safety-footer.component';
import { SafetyHeaderComponent } from './road-safety/NavigationBar/safety-header/safety-header.component';
import { SafetySidebarComponent } from './road-safety/NavigationBar/safety-sidebar/safety-sidebar.component';
import { SafetyHomeComponent } from './road-safety/safety-home/safety-home.component';


import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { RouterOutlet } from "@angular/router";
// import { TrafficJamComponent } from './road-safety/History/traffic-jam/traffic-jam.component';
// import { TrafficJamHistoryComponent } from './road-safety/History/traffic-jam-history/traffic-jam-history.component';
// import { DashboardParkingComponent } from './road-safety/Dashboard/dashboard-parking/dashboard-parking.component';
// import { DashboardTrafficJamComponent } from './road-safety/Dashboard/dashboard-traffic-jam/dashboard-traffic-jam.component';
// import { HomeComponent } from "./road-safety/home/home.component";





var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,

    alertComponent,
    AlertSettingsComponent,
    ConfigarationComponent,
    SafetyFooterComponent,
    SafetyHeaderComponent,
    SafetySidebarComponent,
    SafetyHomeComponent,
    // TrafficJamComponent,
    // TrafficJamHistoryComponent,
    // DashboardParkingComponent,
    // DashboardTrafficJamComponent,
    
   
   
    // FooterComponent,
    // HeaderComponent,
    // SidebarComponent,
    // HomeComponent
   
    

    // RackEditComponent,
  ],
  imports: [
    NgChartsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbCarouselModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      toastComponent: alertComponent,
      progressBar: true,
      tapToDismiss: true,
      newestOnTop: true,
    }),
    NgxDaterangepickerMd.forRoot({}),

    NgMultiSelectDropDownModule.forRoot(),
    RouterOutlet,
    CanvasJSAngularChartsModule,
    Ng2GoogleChartsModule,
  ],
  entryComponents: [alertComponent],
  providers: [
    ServerService,
    DatePipe,
    AuthGuard,
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
    SmartVedioService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(lib: FaIconLibrary) {
    lib.addIconPacks(fas);
  }
}
