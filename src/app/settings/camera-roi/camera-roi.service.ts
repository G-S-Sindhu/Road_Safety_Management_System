import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Subject } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';

@Injectable({
  providedIn: 'root'
})

export class CameraRoiService {
  IP :any
  CameraSettingsChanges: Subject<boolean> = new Subject();

  constructor(
    public http:HttpClient,
    public server:ServerService,
    public snackbar: MatSnackBar,

  ) {
     this.IP = server.IP
   }

   notification(message: string, action?: string, duration?: number) {
    console.log("snackbar");
    this.snackbar.open(message, action ? action : "", {
      duration: duration ? duration : 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

/* -----------------------------------------------Get Camera Details----------------------------------------*/

  GetRACameraData(id: string) {
    return this.http.get(this.IP + "/get_ra_camera_details/" + id);
  }

/*------------------------------------Crowd Count (CC) Services from backend----------------------------------*/

  AddCrowdCount(data: any) {
    return this.http.post(this.IP + "/add_cr_data", data);
   }

  deleteCCData(data: any) {
    return this.http.post(this.IP + "/delete_cr_data", data);
  }

  deleteCCFrameData(data: any) {
    return this.http.post(this.IP + "/delete_crfullframe_data", data);
  }

/*---------------------------------------Danger Zone & PPE services from backend-----------------------------*/

  AddROI(data: any) {
    return this.http.post(this.IP + "/add_roi", data);
  }

  DeleteRoi(data: any) {
    return this.http.post(this.IP + "/delete_roi", data);
  }

  EditROI(data: any) {
    return this.http.post(this.IP + "/edit_roi", data);
  }

/*---------------------------------------Traffic-Count (TC) Services from backend---------------------------*/

AddTCData(data: any) {
  return this.http.post(this.IP + "/add_tc_data", data);
}

deleteTCData(data: any) {
  return this.http.post(this.IP + "/delete_tc_data", data);
}

/*-----------------------------------Fire Smoke Dust  Services from backend---------------------------------*/


  AddFireSmokeToFrame(data: any) {
    return this.http.post(this.IP + "/add_firesmoke", data);
  }

  DeleteFireSmokeFrame(data: any) {
    return this.http.post(this.IP + "/delete_firesmoke", data);
  }


/*------------------------------------Spillage Services from backend----------------------------------*/

  AddSpillageRoi(data: any) {
    return this.http.post(this.IP + "/add_spillage_roi", data);
  }

  DeleteSpillageRoi(data: any) {
    return this.http.post(this.IP + "/delete_spillage_roi", data);
  }



/*----------------------------------------Parking Services from backend--------------------------------------*/

  AddParkingROI(data:any){
    return this.http.post(this.IP + "/add_Parking_roi", data);
  }

  DeleteParkingRoi(data: any) {
    return this.http.post(this.IP + "/delete_parkingRoi", data);
  }

  EditParkingROI(data:any){
    return this.http.post(this.IP+"/edit_Parking_roi",data);
  }

/*---------------------------------------------Traffic-Jam Services from backend------------------------------*/

  AddTraffic_JamROI(data:any){
    return this.http.post(this.IP + "/add_TrafficJam_roi", data);
  }

  DeleteTraffic_JamRoi(data: any) {
    return this.http.post(this.IP + "/delete_TrafficJamRoi", data);
  }

  EditTraffic_JamROI(data:any){
    return this.http.post(this.IP+"/edit_TrafficJam_roi",data);
  }


/*-------------------------------------------- Edit Alarm Details-------------------------------------------*/

  EditAlarm(details: any) {
    return this.http.post(this.IP + "/edit_alarmdetails", details);
  }

 
  /*--------------------------------------Update Camera Feed Image--------------------------------------------*/

  UpdateCameraFeedImage(id: any) {
    return this.http.get(this.IP + "/CameraIMAGE/" + id);
  }



}
