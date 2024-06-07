import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/Services/server.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardParkingService {
  IP:any

  constructor(
    public http: HttpClient,
    private service:ServerService
  ) { 
    this.IP = this.service.IP
  }

  GetCamerasList() {
    return this.http.get(this.IP + "/cameralist");
  }
  
}
