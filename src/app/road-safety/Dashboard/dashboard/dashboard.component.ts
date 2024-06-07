import { AfterViewInit, Component ,OnDestroy,OnInit,Renderer2  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { BubbleController } from 'chart.js';
import { event } from 'jquery';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit,AfterViewInit {
//   camerasLicenseDetails:any[]
  activeIndex: any = 0;

  constructor(
	
	public router:Router,
	public activatedRoute: ActivatedRoute,
  ){
	// this.router.navigate(["road-safety/dashboard/dashboard-parking"]);
  }

  // chartOptions = {
	//   animationEnabled: true,
	//   title:{
	// 	text: "Composition of Internet Traffic in North America"
	//   },
	//   axisX: {
	// 	tickThickness: 0,
	// 	interval: 1,
	// 	intervalType: "year"
	//   },
	//   toolTip: {
	// 	shared: true
	//   },
	//   axisY: {
	// 	lineThickness: 0,
	// 	tickThickness: 0,
	// 	interval: 20
	//   },
	//   legend:{
	// 	verticalAlign: "center",
	// 	horizontalAlign: "right",
	// 	reversed: true
	//   },
	//   data: [{        
	// 	name: "Real-Time",
	// 	showInLegend: true,
	// 	type: "stackedColumn100", 
	// 	color: "#004B8D ",
	// 	dataPoints: [
	// 	  {x: new Date(2017,0), y: 30},
	// 	  {x: new Date(2018,0), y: 40},
	// 	  {x: new Date(2019,0), y: 50},
	// 	  {x: new Date(2020,0), y: 60}
	// 	]
	//   }, {        
	// 	name: "Web Browsing",
	// 	showInLegend: true,
	// 	type: "stackedColumn100", 
	// 	color: "#0074D9 ",
	// 	dataPoints: [
	// 	  {x: new Date(2017,0), y: 40},
	// 	  {x: new Date(2018,0), y: 28},
	// 	  {x: new Date(2019,0), y: 18},
	// 	  {x: new Date(2020,0), y: 12}
	// 	]
	//   }, {        
	// 	name: "File Sharing",
	// 	showInLegend: true,
	// 	type: "stackedColumn100", 
	// 	color: "#4192D9 ",
	// 	dataPoints: [
	// 	  {x: new Date(2017,0), y: 15},
	// 	  {x: new Date(2018,0), y: 15},
	// 	  {x: new Date(2019,0), y: 12},
	// 	  {x: new Date(2020,0), y: 10}
	// 	]
	//   }, {        
	// 	name: "Other",
	// 	showInLegend: true,
	// 	type: "stackedColumn100", 
	// 	color: "#7ABAF2 ",
	// 	dataPoints: [
	// 	  {x: new Date(2017,0), y: 15},
	// 	  {x: new Date(2018,0), y: 17},
	// 	  {x: new Date(2019,0), y: 20},
	// 	  {x: new Date(2020,0), y: 18}
	// 	]
	//   }]
	// }	


//   chartOptions1 = {
// 	  animationEnabled: true,
// 	  title: {
// 		text: "Last 5 Hours Occupancy & violation Level"
// 	  },
// 	  axisX: {
// 		labelAngle: 180
// 	  },
// 	  axisY: {
// 		title: "Occupany Level"
// 	  },
// 	  axisY2: {
// 		title: "violation Level"
// 	  },
// 	  toolTip: {
// 		shared: true
// 	  },
// 	  legend:{
// 		cursor:"pointer",
// 		itemclick: function(e: any){
// 		  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
// 			e.dataSeries.visible = false;
// 		  }
// 		  else {
// 			e.dataSeries.visible = true;
// 		  }
// 		  e.chart.render();
// 		}
// 	  },
// 	  data: [{
// 	    type: "column",	
// 	    name: "Occupany Level",
// 	    legendText: "Occupany",
// 		color:"#DFCD45",
// 	    showInLegend: true, 
// 	    dataPoints:[
// 	  	  {label: "9am - 10am", y: 80},
// 	  	  {label: "10am - 11am", y: 70},
// 	  	  {label: "11am - 12pm", y: 55},
// 	  	  {label: "12pm - 1pm", y: 90},
// 	  	  {label: "1pm - 2pm", y: 100},
// 		// 	{label: "9am - 10am", y: 0,color:" #D57B1A"},
// 	  	//   {label: "10am - 11am", y: 0,color:"#D57B1A"},
// 	  	//   {label: "11am - 12pm", y: 0,color:"#D57B1A"},
// 	  	//   {label: "12pm - 1pm", y: 0,color:"#D57B1A"},
// 	  	//   {label: "1pm - 2pm", y: 0,color:"#D57B1A"},
// 	  	  // {label: "Kuwait", y: 104},
// 	  	  // {label: "UAE", y: 97.8},
// 	  	  // {label: "Russia", y: 60},
// 	  	  // {label: "US", y: 23.3},
// 	  	  // {label: "China", y: 20.4}
// 	  ]
// 	  }, {
// 	    type: "column",	
// 	    name: "Violation Level",
// 	    legendText: "Violations",
// 		color:"#E1554E",
// 	    axisYType: "secondary",
// 	    showInLegend: true,
// 	    dataPoints:[
// 	  	  {label: "9am - 10am", y: 11.15},
// 	  	  {label: "10am - 11am", y: 2.5},
// 	  	  {label: "11am - 12pm", y: 30},
// 	  	  {label: "12pm - 1pm", y: 4.2},
// 	  	  {label: "1pm - 2pm", y: 2.6},
// 		//   {label: "9am - 10am", y: 0,color:"#BE4E4E"},
// 		//   {label: "10am - 11am", y: 0,color:"#BE4E4E"},
// 		//   {label: "11am - 12pm", y: 0,color:"#BE4E4E"},
// 		//   {label: "12pm - 1pm", y: 0,color:"#BE4E4E"},
// 		//   {label: "1pm - 2pm", y: 0,color:"#BE4E4E"},
// 	  	  // {label: "Kuwait", y: 2.7},
// 	  	  // {label: "UAE", y: 3.1},
// 	  	  // {label: "Russia", y: 10.23},
// 	  	  // {label: "US", y: 10.3},
// 	  	  // {label: "China", y: 4.3}
// 	  ]
//     }]
//   }	



// //   chartOptions2 = {
// // 	animationEnabled: true,
// // 	theme: "light2",
// // 	title: {
// // 		text: " Last 5 Hours Violations Count"
// // 	},
// // 	// subtitles: [{
// // 	// 	text: "U.S.A"
// // 	// }],
// // 	axisY: {
// // 		title: "Violation Count",
// // 		includeZero: true,
// // 	},
// // 	data: [{
// // 		type: "stepArea",
// // 		color: "#64B5F6",
// // 		lineColor: "#0D47A1",
// // 		markerColor: "#0D47A1",
// // 		markerSize: 5,
// // 		dataPoints: [
// // 			{ label: "9am - 10am", y: 11 },
// // 			{ label: "10am - 11am", y: 24 },
// // 			{ label: "11am - 12pm", y: 46 },
// // 			{ label: "12pm - 1pm", y: 25 },
// // 			{ label: "1pm - 2pm", y: 10 },
// // 			// { label: "2009", y: 12 },
// // 		]
// // 	}]
// // }


// risk = {  
// 	chartType: 'Gauge',  
// 	dataTable: [  
// 		['Label', 'Value'],  
// 		['Market Risk', 3.2],              
// 	],  
// 	options: {  
// 		'title': 'Market Risk',              
// 		'max': 5,  
// 		'greenFrom': 0,  
// 		'greenTo': 3,  
// 		'yellowFrom': 3,  
// 		'yellowTo': 4,  
// 		'redFrom': 4,  
// 		'redTo': 5,  
// 	},  
// }; 


// guageChartData = {  
// 	chartType: 'Gauge',  
// 	dataTable: [  
// 		['Label', 'Value'],  
// 		['CPU', 33],  
// 		['Memory', 84],  
// 		['Disk', 55],  
// 		['Network', 5],  
// 		['GPU', 3]  
// 	],  
// 	options: {  
// 		'title': 'Tasks',  
// 		'greenFrom': 0,  
// 		'greenTo': 30,  
// 		'yellowFrom': 30,  
// 		'yellowTo': 80,  
// 		//'yellowColor': '#CCCC00',  
// 		'redFrom': 80, 'redTo': 100,  
// 		'max': 100  
// 	},  
// };  


// chartOptions2 = {
//     title:{
//       text: "Last 5 Hours Violations Count Level"  
//     },
//     animationEnabled: true,
//     data: [{        
//       type: "column",
// 	  color:'#E1554E',
//       dataPoints: [
// 		{ label: '9am - 10am', y: 95},
//         { label: '10am - 11am', y: 71 },
//         { label: '11am - 12pm', y: 55 },
//         { label: '12pm - 1pm', y: 50 },
//         {label: '1pm - 2pm', y: 65 }
        
//         // { x: 60, y: 68 },
//         // { x: 70, y: 28 },
//         // { x: 80, y: 34 },
//         // { x: 90, y: 14 }
//       ]
//     }]
//   }



// //   scrollToParagraph() {
// // 	console.log('this is from the scrolltoparagraph ')
// // 	const targetElement = document.getElementById('demo');
// // 	if (targetElement) {
// // 	  this.renderer.setProperty(targetElement, 'scrollIntoView', { behavior: 'smooth' });
// // 	  console.log('this is from the inside of the if function===========')
// // 	}
// //   
// scrollToParagraph() {
// 	const targetElement = document.getElementById('demo');
// 	if (targetElement) {
// 	  targetElement.scrollIntoView({ behavior: 'smooth' });
// 	}
//   }



//   chartOptions3 = {
   
//     title:{
//       text: "Last 5 Hours Violations Count Level"
//     },
//     animationEnabled: true,
//     toolTip: {
//       shared: true
//     },
//     legend: {
//       horizontalAlign: "right",
//       verticalAlign: "center",
//       reversed: true
//     },
//     axisY: {
//        includeZero: true
//     },
//     data: [{
//       type: "stackedColumn",
//       name: "Bike",
//       showInLegend: true,
// 	  color:"#F44C43",
//       dataPoints: [
//         { label: "Qtr 1", y: 60, },
//         { label: "Qtr 2", y: 80, },
//         { label: "Qtr 3", y: 90, },
//         { label: "Qtr 4", y: 70, }
//       ]
//     }, {
//         type: "stackedColumn",
//         name: "Car",
//         showInLegend: true,
// 		color:"#F67D77",
//         dataPoints: [
//           { label: "Qtr 1", y: 60, },
//           { label: "Qtr 2", y: 70, },
//           { label: "Qtr 3", y: 60, },
//           { label: "Qtr 4", y: 50, }
//         ]
//     },
// 	//  {
//     //     type: "stackedColumn",
//     //      name: "Instagram",
//     //     showInLegend: true,
//     //     dataPoints: [
//     //       { label: "Qtr 1", y: 5338 },
//     //       { label: "Qtr 2", y: 8670 },
//     //       { label: "Qtr 3", y: 4779 },
//     //       { label: "Qtr 4", y: 9415 }
//     //     ]
//     // }
// ]
//   }	

  ngOnInit(): void{
	 this.router.navigate(["road-safety","dashboard","dashboard-parking"]);	
  }

ngAfterViewInit(): void {
	this.OnTabChange(event)
}
  OnTabChange(event: any) {
    switch (event.index) {
      case 0: {
        this.activeIndex = 0;
        this.router.navigate(["road-safety", "dashboard", "dashboard-parking"]);
        break;
      }

      case 1: {
        this.activeIndex = 1;

        this.router.navigate(["road-safety", "dashboard", "dashboard-traffic_jam"]);

        break;
      }

    //   case 2: {
    //     this.activeIndex = 2;
    //     this.router.navigate(["app", "violations", "CrowdCount"]);
    //     break;
    //   }
    //   case 3: {
    //     this.activeIndex = 3;
    //     this.router.navigate(["app", "violations", "SpillageDetection"]);
    //     break;
    //   }
    //   case 4: {
    //     this.activeIndex = 4;
    //     this.router.navigate(["app", "violations", "FireDetection"]);
    //     break;
    //   }
    //   case 5: {
    //     this.activeIndex = 5;
    //     this.router.navigate(["app", "violations", "Steam-SuitDetection"]);
    //   }
    }
  }


  ngOnDestroy(){

  }
  }
  


