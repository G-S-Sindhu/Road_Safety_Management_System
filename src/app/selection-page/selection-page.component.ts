import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.css']
})
export class SelectionPageComponent {

  constructor(
    private Router: Router,
  )
  {
    
  }

  GoToRoadSafety(){
    this.Router.navigate(['/road-safety/camera-settings'])
  }

  GoToDocketrunApp(){
    this.Router.navigate(['/app/CameraSettings'])
  }

}
