import { Component, OnInit ,Input} from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  template: `
  <div id="chart">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [dataLabels]="chartOptions.dataLabels"
    [plotOptions]="chartOptions.plotOptions"
    [responsive]="chartOptions.responsive"
    [xaxis]="chartOptions.xaxis"
    [legend]="chartOptions.legend"
    [fill]="chartOptions.fill"
  ></apx-chart> </div> `,
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
