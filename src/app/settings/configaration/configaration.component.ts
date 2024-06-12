import { Component } from '@angular/core';
import { CameraSettingsComponent } from '../camera-settings/camera-settings.component';


@Component({
  selector: 'app-configaration',
  templateUrl: './configaration.component.html',
  styleUrls: ['./configaration.component.css'],
  
})
export class ConfigarationComponent {

  constructor(
    
  ){

  }
ngOnInit():void{
   alert('hii this is from the configaration')
}
 public hello(){
   prompt('hello form the hello function')
  // this.cameraroi.isParking = true;
  //   this.cameraroi.isTraffic_jam = false;
  //   this.cameraroi.isPolygonDrawn = false;
  //   // this.classIds = ["person"];
  //   this.cameraroi.polygonOptions.stroke = this.cameraroi.parkingROIColor;
  //   this.cameraroi.newROI.stroke = this.cameraroi.parkingROIColor;
  //   this.cameraroi.isWater = false;
  //   this.cameraroi.isAddROI = false;
  //   this.cameraroi.isSpillage = false;
  //   this.cameraroi.isEdit = false;
  //   this.cameraroi.roiType = 1;
  //   this.cameraroi.newROIPoints.splice(0, this.cameraroi.newROIPoints.length);
  //   this.cameraroi.canvas.requestRenderAll();
  //   this.cameraroi.isAddCC = false;


}
}
