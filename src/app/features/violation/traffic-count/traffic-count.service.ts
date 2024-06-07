import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from 'src/app/Services/server.service';

@Injectable({
  providedIn: 'root'
})

export class TrafficCountService {

  liveViolInterval:any
  ccLiveInterval:any
  logInterval:any

  constructor(
    public AppServer:ServerService,
    public http:HttpClient ,
    public datePipe:DatePipe ,
    public snackbar:MatSnackBar) 
    { 
    this.logInterval= this.AppServer.logInterval
  }

  GetTCLiveData(cameraName?:string|null,department_name?:string|null){
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null
  
    cameraName==="all_cameras"?cameraName=null:''
    department_name==="all_departments"?department_name='none':''

  var body
   body={camera_name: cameraName,department_name:department_name}
    
    return cameraName !== null || department_name !== null?this.http.post( this.AppServer.IP+'/live_data1TC',body):this.http.get(this.AppServer.IP+'/live_data1TC')
  }

  GetTCDataByFilters(fromD: any, toD: any, page?: number|null, size?: number|null,department_name?:string|null, cameraName?: string | null) { 
    // var fromD =this.AppServer.dateTransform(from)
    // var toD = this.AppServer. dateTransform(to)
    // console.log(fromD, toD)
    console.log(page, size)
  
    cameraName==="all_cameras"?cameraName=null:''
    department_name==="all_departments"?department_name='none':''
   var body
   body={from_date:fromD,to_date:toD,camera_name:cameraName,department_name:department_name}
  //  console.log(body)
    return    page && size && cameraName &&((fromD && toD ))? this.http.post(this.AppServer.IP + '/datewiseTC/' + cameraName + '/' + page + '/' + size, body) : 
    page && size && (!cameraName)&&(fromD &&toD ) ? this.http.post(this.AppServer.IP + '/datewiseTC/'+ page + '/' + size , body):
     !page && !size &&cameraName&&(fromD && toD ) ? this.http.post(this.AppServer.IP + '/datewiseTC/'  + cameraName,body) :
      !page && !size &&department_name&&(fromD && toD ) ? this.http.post(this.AppServer.IP + '/datewiseTC' , body) :
     this.http.post(this.AppServer.IP + '/datewiseTC', body)
  
  }

  GetTCCameraDetails(from:any,to:any){
     return  from === null && to === null? this.http.get(this.AppServer.IP+'/camera_detailsTC'):this.http.post(this.AppServer.IP+'/camera_detailsTC',{from_date:from,to_date:to})
    //return this.http.get(this.AppServer.IP+'/camera_detailsTC');
  }
  

  GetTCDepartmentDetails(from:any,to:any){
    return  from === null && to === null? this.http.get(this.AppServer.IP+'/department_detailsTC'):this.http.post(this.AppServer.IP+'/department_detailsTC',{from_date:from,to_date:to})
  }

  // GetCameraDetails(from:any,to:any){
  //   return  from === null && to === null? this.http.get(this.IP+'/Spillagecameradetails'):this.http.post(this.IP+'/Spillagecameradetails',{from_date:from,to_date:to})
  //  }


  dateTransformbyPattern(date:Date,pattern:string){
    return this.datePipe.transform(date,pattern)
  }

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom', 
    })
    )
  }
}
