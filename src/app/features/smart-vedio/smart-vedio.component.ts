import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { Observable, interval, of } from 'rxjs';
import { VideoModalComponent } from 'src/app/common/video-modal/video-modal.component';
import { SmartVedioService } from './smartVideo.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-smart-vedio',
  templateUrl: './smart-vedio.component.html',
  styleUrls: ['./smart-vedio.component.css']
})
export class SmartVedioComponent implements AfterViewInit ,OnInit,OnDestroy{
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }
  fromDate:any
  IP:any=''
  toDate:any
  selectedVideoId:Observable< string>=of('')
  pageSize:number=10;
  collectionSize:number=4
  page=0;
 table:HTMLElement
 selectedDate:any=''
 selectedCoin:any=' '
 selectedCam:any=' '
 interval:any
 intervalValue:number
  dataInterval:any
 isLive:boolean=null
 videoData:any[]=[]
  violationDetails:Observable<any[]>=of([])
  tempData:any[]=[]
  @ViewChild('modal',{static:false}) private modalComponent: any

  coinIdList:Observable<any[]>= of([])
  cameraList:Observable<any[]>=of([])
  total:Observable<number>=of(4)
  selectedCoinId:any
  selectedCamera:any
constructor(public modalService:NgbModal,private SmartVideoService:SmartVedioService,public Datepipe:DatePipe){
 this.IP=this.SmartVideoService.IP
 this.intervalValue=this.SmartVideoService.intervalValue
}
ngOnInit(): void {
  this.SmartVideoService.GetSensgizViolByFilters(this.selectedDate?this.selectedDate:' ',this.selectedCam?this.selectedCam:' ',this.selectedCoin?this.selectedCoin:' ').subscribe((response:any)=>{
    console.log(response)
   this.table? this.table.classList.remove('loading'):''
    if(response.success===true){
this.tempData=response.message
this.sliceData()
    }
    else{
      this.SmartVideoService.notification(response.message)
      this.tempData=[]
      this.sliceData()
    }
  },
  (Err:any)=>{
    this.SmartVideoService.notification('Error while fetching the data','Retry')

   this.table? this.table.classList.remove('loading'):''
    this.SmartVideoService.notification('Error while Fetching the Data','Retry')
  })
    this.GetApplicationStatus()
this.interval= setInterval(()=>{
this.GetViolData()
this.GetApplicationStatus()
},this.intervalValue)
this.GetCoinIdList()
this.GetCameraList()
}
  dateUpdated(event:any){
    console.log(event)
    // this.fromDate=this.selectedMoments.startDate?this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'):' '
    // this.toDate=this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')

  }
  OnCoinIdSelect(event:any){

  }

  OnCameraSelect(event:any){
  

  }

  openVideoModal(id:number)
  {
    this.selectedVideoId=of( String(id-1))
   this.videoData=[...this.tempData]
    setTimeout(() => {
      this.modalService.open(this.modalComponent,{centered:true,size:'xl'})

  });

  }

  modalClose(event:any){
    console.log('close event enitted')
   this.modalService.dismissAll() 
  }
 
  ngAfterViewInit(): void {
   this.table=document.getElementById('dataTable')
   this.selectedDate= this.Datepipe.transform(new Date(),'YYYY-MM-dd')
 }

 
  GetCoinIdList(){

    var coins:any[]=[]
    var coinList:any[]=[{key:0,label:'All Coin Id',data:' '}]
    this.SmartVideoService.GetCoinIdList().subscribe((data:any)=>{
      if (data.success === true) {
        data.message.forEach((el: any, i: number) => {
          coins.push({ d: i, data: el })
        });
        console.log(coins)
        coins = coins.filter((el, i, a) => i === a.indexOf(el))
        console.log(coins)
        coins.forEach((element: any, i: number) => {
         // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
         var obj;
          console.log(element)
         obj={key:((i+1).toString()),label:element.data,data:element.data}
       
       coinList.push(obj)
        });
  
       
        console.log(coinList)
        this.coinIdList = of(coinList)
      }
  
    })
  }

  GetCameraList(){
    var coins:any[]=[]
    var coinList:any[]=[{key:0,label:'All Camera',data:' '}]
    this.SmartVideoService.GetCameraList().subscribe((data:any)=>{
      if (data.success === true) {
        data.message.forEach((el: any, i: number) => {
          coins.push({ d: i, data: el })
        });
        console.log(coins)
        coins = coins.filter((el, i, a) => i === a.indexOf(el))
        console.log(coins)
        coins.forEach((element: any, i: number) => {
         // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
         var obj;
          console.log(element)
         obj={key:((i+1).toString()),label:element.data,data:element.data}
       
       coinList.push(obj)
        });
  
       
        console.log(coinList)
        this.cameraList = of(coinList)
      }
  
    })
  }

  Reset(){
    this.selectedCam=' '
    this.selectedCamera=null
    this.selectedCoin=' '
    this.selectedCoinId=null
    this.selectedMoments=null
    this.selectedDate=' '
    this.GetViolData()
  }
  GetViolData(){
    return  this.SmartVideoService.GetSensgizViolByFilters(this.selectedDate?this.selectedDate:' ',this.selectedCam?this.selectedCam:' ',this.selectedCoin?this.selectedCoin:' ').subscribe((response:any)=>{
      console.log(response)
     this.table? this.table.classList.remove('loading'):''
      if(response.success===true){
  this.tempData=response.message
  this.sliceData()
      }
      else{
        this.tempData=[]
        this.sliceData()
      }
    },
    (Err:any)=>{
     this.table? this.table.classList.remove('loading'):''
    })
  }
  sliceData(){
    this.total = of((this.tempData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempData.length)
    this.violationDetails = of((this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))

  }


  GetApplicationStatus(){
    this.SmartVideoService.CheckApplicationStatus().subscribe((response:any)=>{
      if(response.success){
        {
          
          var process2 = response.message.find((el: any) => {
  
            return el.process_name == 'smrec' ? el : ''
          })
  
          this.isLive = process2.process_status
        }
      }
    })
  }
  datesUpdated(event:any){
   this.table? this.table.classList.add('loading'):''
    console.log(event)
    this.selectedDate=event.startDate !=null? event.startDate.format('YYYY-MM-DD'):this.Datepipe.transform(new Date,'YYYY-MM-dd')
    console.log(this.selectedDate)
    this.GetViolData()
  }


  OnCoinSelect(event:any){
this.selectedCoin=this.selectedCoinId.data
console.log(this.selectedCoin)
this.table? this.table.classList.add('loading'):''
this.GetViolData()
  
  }
  onCameraSelect(event:any){
    this.selectedCam=this.selectedCamera.data
    this.table.classList.add('loading')
    this.GetViolData()
  }
  StartApplication(){
    this.SmartVideoService.StartApplication().subscribe((response:any)=>{
      this.SmartVideoService.notification(response.message)
       
    })
  }

ngOnDestroy(): void{
  clearInterval(this.interval)
}
}
