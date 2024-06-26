import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ParkingHistoryService {
  logInterval:number=0
  IP:string

  constructor(public http:HttpClient,
    public snackbar:MatSnackBar,
    public datePipe:DatePipe
  ) 
  {
    var res=this.loadConfigFile('assets/config.json')
    res=JSON.parse(res)
    this.IP=res.IP
    this.logInterval=res.logInterval 
   }

   loadConfigFile(filepath:any){
    const JSON=this.readConfigFile(filepath,'application/json')
    return JSON
  }

  readConfigFile(filepath:any,mimeType:any){
    var xmlRequest=new XMLHttpRequest() 
    xmlRequest.open('GET',filepath,false)
    if (mimeType != null) {
     if (xmlRequest.overrideMimeType) {
         xmlRequest.overrideMimeType(mimeType);
     }
     xmlRequest.send()
     if(xmlRequest.status){
         return xmlRequest.response
     }
     else{
         return null
     }
   }
   
   }

dateTransform(date:Date){
    return this.datePipe.transform(date,'yyyy-MM-dd HH:mm:ss') 
 }


LivePPEViolationData(
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
            "/live_data1PPE/"+
            page +
            "/" +
            size,body
        )
      :!page && !size && (cameraName||department)
        ? this.http.post(this.IP + "/live_data1PPE",body)
       
      : this.http.get(this.IP + "/live_data1PPE");
  
}


DatewisePPEViolations(
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
  body = {
    from_date: fromD,
    to_date: toD,
     department_name: department !== null ? department : "none",
  };

  return page && size && cameraName && department
    ? this.http.post(
        this.IP + "/datewisePPE/"  +cameraName+'/'+ page + "/" + size,
        body
      )
    : // page && size && department ? this.http.post(this.IP + '/datewiseRA/' + department + '/' + page + '/' + size, body) :
    !page && !size && !cameraName 
    ? this.http.post(this.IP + "/datewisePPE", body)
    : page && size && !cameraName 
    ? this.http.post(this.IP + "/datewisePPE/" + page + "/" + size, body)
    : page && size && cameraName
    ? this.http.post(this.IP + "/datewisePPE/" +cameraName+'/'+ page + "/" + size, body)
    : !page && !size && cameraName &&!department
    ? this.http.post(this.IP + "/datewisePPE/" + cameraName, body)
    : !page && !size && department && cameraName
    ? this.http.post(this.IP + "/datewisePPE", body)
    : //  !page && !size &&department ? this.http.post(this.IP + '/datewiseRA' , body) :
      this.http.post(this.IP + "/datewisePPE", body);
}


ChangePPEFiltersData(data:any){
  return this.http.post(this.IP+'/PPEviolationPercentage',data)
}

GetPPEFiltersData(){
  return this.http.get(this.IP+'/PPEviolationPercentage')
}

CreatePPEViolationExcel(data:any){
  return this.http.post(this.IP+'/create_violation_excelPPE',data)
}

DownloadViolationExcel(){
  return this.http.get(this.IP+'/violation_excel_download',{observe:'response',responseType:'arraybuffer'})
}


GetLatestPPEData(camera_name:any){
  return camera_name? this.http.get(this.IP+'/latest_dataPPE/'+camera_name):this.http.get(this.IP+'/latest_dataPPE')
}

GetPPECameraDetails(from:any,to:any){
  return from === null && to === null? this.http.get(this.IP+'/camera_detailsPPE'):this.http.post(this.IP+'/camera_detailsPPE',{from_date:from,to_date:to})
}

GetPPEDepartmentDetails(from:any,to:any){
  return from === null && to === null? this.http.get(this.IP+'/department_detailsPPE'):this.http.post(this.IP+'/department_detailsPPE',{from_date:from,to_date:to})
}

// GetRACameraDetails(from:any,to:any){
//   // var fromD = this.dateTransform(from)
//   // var toD = this.dateTransform(to)
//   return from === null && to === null? this.http.get(this.IP+'/camera_detailsRA'):this.http.post(this.IP+'/camera_detailsRA',{from_date:from,to_date:to})
// }
GetViolationList(){
  return this.http.get(this.IP+'/violation_type_details')
}

VerifyViolation(id:string,flag:any){
  return this.http.get(this.IP+'/violation_verification/'+id+'/'+flag)
}

notification(message: string, action?: string) {
  this.snackbar.open(message, action ? action : '', ({
    duration: 4000, panelClass: ['error'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  })
  )
}

DeleteViolationData(id:any){
  return this.http.get(this.IP+'/Deleteviolation/'+id)
}
}
