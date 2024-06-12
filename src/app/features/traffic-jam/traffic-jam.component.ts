import { Component } from '@angular/core';
import { data } from 'jquery';
export interface TrafficJamData{
 
}
@Component({
  selector: 'app-traffic-jam',
  templateUrl: './traffic-jam.component.html',
  styleUrls: ['./traffic-jam.component.css']
})


export class TrafficJamComponent {
  barChartData:any

  tjData:any[]=[{
    id: 1,
    img_name: "1.jpg",
    start_time:" 10:30:00 04/05/2024",
    stop_time: "10:33:00 04/05/2024",
    Preset_percentage: 70,
    roi_bbox: "10;1;10;1;2;20;2;20;",
         status: "Running",
         Remarks: ''
  },
  {
    id: 2,
    img_name: '2.jpg',
    start_time:' 10:39:00 04/05/2024',
    stop_time: '10:50:00 04/05/2024',
    Preset_percentage: 70,
    roi_bbox: '10;1;10;1;2;20;2;20',
         status: 'Running',
         Remarks: ''
  },
  {
    id: 1,
    img_name: "1.jpg",
    start_time:" 10:30:00 04/05/2024",
    stop_time: "10:33:00 04/05/2024",
    Preset_percentage: 70,
    roi_bbox: "10;1;10;1;2;20;2;20;",
         status: "Running",
         Remarks: ''
  },
  {
    id: 1,
    img_name: "1.jpg",
    start_time:" 10:30:00 04/05/2024",
    stop_time: "10:33:00 04/05/2024",
    Preset_percentage: 70,
    roi_bbox: "10;1;10;1;2;20;2;20;",
         status: "Running",
         Remarks: ''
  },
  {
    id: 1,
    img_name: "1.jpg",
    start_time:" 10:30:00 04/05/2024",
    stop_time: "10:33:00 04/05/2024",
    Preset_percentage: 70,
    roi_bbox: "10;1;10;1;2;20;2;20;",
         status: "Running",
         Remarks: ''
  },]
constructor(){
 this.GetChartData()
}
GetChartData(){
  this.barChartData ={
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
}
}
