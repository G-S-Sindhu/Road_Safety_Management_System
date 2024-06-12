import { Component, OnInit ,Input} from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  template: `
    <canvas baseChart [data]="chartData" [labels]="chartLabels" [options]="chartOptions" [legend]="true" [type]="'bar'"></canvas>
  `,
  styles: [
  ]
})
export class BarChartComponent implements OnInit{
@Input() chartData:any =[]
@Input() chartLabels:any
@Input() chartOptions:any
constructor(){

}
ngOnInit(): void {
  
}
}
