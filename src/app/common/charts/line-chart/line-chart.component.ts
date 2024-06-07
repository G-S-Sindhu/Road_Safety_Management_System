import { Component  ,Input} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  template: `
  
  `,
  styles: [
  ]
})
export class LineChartComponent {
  @Input() chartData:any =[]
  @Input() chartLabels:any
  @Input() chartOptions:any
  constructor(){
    // <canvas baseChart [data]="chartData" [labels]="chartLabels" [options]="chartOptions" [legend]="true" [type]="'line'"></canvas>
  }
  ngOnInit(): void {
    
  }
}
