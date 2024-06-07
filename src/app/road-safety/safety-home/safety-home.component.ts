import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safety-home',
  templateUrl: './safety-home.component.html',
  styleUrls: ['./safety-home.component.css']
})
export class SafetyHomeComponent {

  constructor(
    private router: Router
  ){
  
  }
    ngOnInit(): void {
    }

}
