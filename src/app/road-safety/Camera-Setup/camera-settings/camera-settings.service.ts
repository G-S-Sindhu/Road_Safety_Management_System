import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ServerService } from 'src/app/Services/server.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CameraSettingsService {

  IP :any
  checkApplicationStatusInterval:number
  secretKey:any

  constructor(
    public http: HttpClient,
    private server:ServerService,
    public datePipe: DatePipe,
    public snackbar: MatSnackBar,
  ) {
    this.IP = server.IP
    this.checkApplicationStatusInterval = server.checkApplicationStatusInterval
    this.secretKey = server.secretKey
   }


   dateTransform(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");
  }
  
  CheckApplicationStatus() {
    return this.http.get(this.IP + "/check_process");
  }

  CameraSettingsChanges: Subject<boolean> = new Subject();

  CheckLicense() {
    return this.http.get(this.IP + "/check_license");
  }

  UpdateCameraAnalytics(id: any, value: any) {
    return this.http.get(this.IP + "/analytics_status/" + id + "/" + value);
  }

  EditCamera(details: any) {
    return this.http.post(this.IP + "/edit_camera", details);
  }

  AddRACamerabyRtsp(details: any) {
    return this.http.post(this.IP + "/add_camera_rtsp", details);
  }

  AddCameraDetails(details: any) {
    return this.http.post(this.IP + "/add_camera", details);
  }

  StartApplication() {
    return this.http.get(this.IP + "/create_phaseone_config");
  }

  getCameras() {
    return this.http.get(this.IP + "/get_ra_camera_details");
  }

  GetCameraBrandDetails() {
    return this.http.get(this.IP + "/get_camera_brand_details");
  }

  stopApp() {
    return this.http.get(this.IP + "/stop_app_common");
  }

  DownloadCameraSheet() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    });
    return this.http.get(this.IP + "/download_camera_status_sheet", {
      headers: headers,
      observe: "body",
      responseType: "arraybuffer",
    });
  }

  dateTransformbyPattern(date: Date, pattern: string) {
    return this.datePipe.transform(date, pattern);
  }

  UploadCameraIPsFile(file: any) {
    return this.http.post(this.IP + "/upload_cameras_excel", file, {
      withCredentials: true,
    });
  }

  TestCameraIps() {
    return this.http.get(this.IP + "/get_camera_status_excel", {
      withCredentials: true,
    });
  }

  getCameraExcelSample() {
    // const headers = new HttpHeaders({
    //     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    //   'Accept-Language': 'en-US,en;q=0.5',
    //  ' Accept-Encoding':' gzip, deflate',

    // })
    return this.http.get(this.IP + "/get_samplefileFORCHECKCAMERA", {
      observe: "response",
      responseType: "blob",
    });
  }

  GetLicenseDetails() {
    return this.http.get(this.IP + "/license_count");
  }

  AddMechJobByExcel(data: FormData) {
    // const headers = new HttpHeaders({ "Content-Type": "multipart/form-data" });
    // const options = { headers };
    // var formData = new FormData();
    // formData.append("file", data.get("file"));

    return this.http.post(this.IP + "/addcamerausingexcel", data);
  }

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : "", {
      duration: 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  DeleteCameraDetails(id: string) {
    return this.http.get(this.IP + "/delete_ra_camera/" + id);
  }

  ConfigRtsp(option: any) {
    return this.http.get(this.IP + "/set_rtsp_flag/" + option);
  }
}
