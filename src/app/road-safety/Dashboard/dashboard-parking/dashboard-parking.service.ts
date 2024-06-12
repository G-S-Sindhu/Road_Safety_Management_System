import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/Services/server.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardParkingService {

  IP:any;

  constructor(
    public http: HttpClient,
    private service:ServerService
  ) 
  { 
    this.IP = this.service.IP
  }

  
  GetCamerasList() {
    return this.http.get(this.IP + "/cameralist");
  }

  GetParkingSlotsDetails(data:any){
    return this.http.post(this.IP +"/slot_details/PA",data);
  }

  GetNo_ParkingSlotsDetails(data:any){
    return this.http.post(this.IP +"/slot_details/NPA",data);
  }

  GetParkingSlotsStatus(){
    return this.http.get(this.IP + '/slots_status_details/VPMS/PA');
  }

  GetNo_ParkingSlotsStatus(){
    return this.http.get(this.IP + '/slots_status_details/VPMS/NPA');
  }
  
  GetLatestParkingFiveHoursDetails(){
    return this.http.get(this.IP + "/get_latest_five_hours_data")
  }
}
