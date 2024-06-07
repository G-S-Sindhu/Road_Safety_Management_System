import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ParkingHistoryService {
  IP: string;
  logInterval: number = 0;
  raLiveInterval: any;
  constructor(
    public http: HttpClient,
    public snackbar: MatSnackBar,
    public datePipe: DatePipe
  ) {
    var res = this.loadConfigFile("assets/config.json");
    res = JSON.parse(res);
    this.IP = res.IP;
    this.logInterval = res.logInterval;
  }

  loadConfigFile(filepath: any) {
    const JSON = this.readConfigFile(filepath, "application/json");
    return JSON;
  }
  readConfigFile(filepath: any, mimeType: any) {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", filepath, false);
    if (mimeType != null) {
      if (xmlRequest.overrideMimeType) {
        xmlRequest.overrideMimeType(mimeType);
      }
      xmlRequest.send();
      if (xmlRequest.status) {
        return xmlRequest.response;
      } else {
        return null;
      }
    }
  }

  dateTransform(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");
  }

  LiveRAViolationData(
    cameraName?: string | null,
    department?: string | null,
    page?: number,
    size?: number
  ) {
    department === "all_departments" ? (department = null) : "";
    cameraName === "all_cameras" ? (cameraName = null) : "";
     var body={
              department_name:department,
              camera_name:cameraName
     }
    return page && size && (cameraName|| department)
      ? this.http.post(
          this.IP +
            "/PA_history/"+
            page +
            "/" +
            size,body
        )
      :!page && !size && (cameraName||department)
        ? this.http.post(this.IP + "/PA_history",body)
       
      : this.http.get(this.IP + "/PA_history");
  }

  DatewiseRAViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    department?: string | null,
    cameraName?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    cameraName === "all_cameras" ? (cameraName = null) : "";
    department === "all_departments" ? (department = null) : "";
    var body:any;
    // body = {
    //   from_date: fromD,
    //   to_date: toD,
    //    department_name: department !== null ? department : "none",
    // };
    body =
    {
      from_date:fromD,
      to_date:toD,
      cameraname:null,
      violation_value:null,
      parking_type:null,
      department:department
  }

    return this.http.post(this.IP + "/datewise_history", body);
     
  }

  CreateRAViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelRA", data);
  }

  DownloadViolationExcel() {
    return this.http.get(this.IP + "/violation_excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  GetLatestRAData(camera_name: any, department: any) {
    return (
      camera_name
        ? this.http.get(this.IP + "/latest_dataRA/" + camera_name)
        : this.http.get(this.IP + "/latest_dataRA"),
      department
        ? this.http.get(this.IP + "/latest_dataRA/" + department)
        : this.http.get(this.IP + "/latest_dataRA")
    );
  }

  GetRACameraDetails(from: any, to: any) {
    var fromD = this.dateTransform(from)
    var toD = this.dateTransform(to)
    return from === null && to === null
      ? this.http.get(this.IP + "/camera_detailsRA")
      : this.http.post(this.IP + "/camera_detailsRA", {
          from_date: from,
          to_date: to,
        });
    // return this.http.get(this.IP +"/cameralist")
  }

  GetRADepartmentDetails(from: any, to: any) {
    // var fromD = this.dateTransform(from)
    // var toD = this.dateTransform(to)
    return from === null && to === null
      ? this.http.get(this.IP + "/department_detailsRA")
      : this.http.post(this.IP + "/department_detailsRA", {
          from_date: from,
          to_date: to,
        });
  }

  GetViolationList() {
    return this.http.get(this.IP + "/PA_history");
  }

  VerifyViolation(id: string, flag: any) {
    return this.http.get(
      this.IP + "/violation_verification/" + id + "/" + flag
    );
  }

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : "", {
      duration: 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  DeleteViolationData(id: any) {
    return this.http.get(this.IP + "/Deleteviolation/" + id);
  }

  LatestHistory(){
    return this.http.get(this.IP+"/latest_parking_history")
  }
  Violations(){
    return this.http.get(this.IP + "/violations_data")
  }
  
  // Datewise(
  // from:any,
  // to:any,
  // cameraname:any,
  // violation:any,
  // parking_type:any 
  // )
  // {
  //  var body:any={
  //   from_date:from,
  //   to_date:to,
  //   cameraname:cameraname,
  //   violation_value:violation,
  //   parking_type:parking_type

  //   }
  //   return this.http.post(this.IP +"/datewise_history",body)
    

  // }
  OnlyParking(){
   return this.http.get(this.IP+"/PA_history/true")
  }

  OnlyNo_Parking(){
    return this.http.get(this.IP+"/PA_history/false")
  }
}