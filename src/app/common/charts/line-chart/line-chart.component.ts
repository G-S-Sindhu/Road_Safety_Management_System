import { Component  ,Input} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  template: `
  <canvas baseChart [data]="chartData" [labels]="chartLabels" [options]="chartOptions" [legend]="true" [type]="'line'"></canvas>
  `,
  styles: [
  ]
})
export class LineChartComponent {
  @Input() chartData:any =[]
  @Input() chartLabels:any
  @Input() chartOptions:any
  constructor(){
  
  }
  ngOnInit(): void {
    
  }
}
