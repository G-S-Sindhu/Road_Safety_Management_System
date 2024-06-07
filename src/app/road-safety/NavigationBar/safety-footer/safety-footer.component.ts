import { Component } from '@angular/core';

@Component({
  selector: 'app-safety-footer',
  templateUrl: './safety-footer.component.html',
  styleUrls: ['./safety-footer.component.css']
})
export class SafetyFooterComponent {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.getElementById('current-year').innerHTML= new Date().getFullYear().toString()
  }

}
