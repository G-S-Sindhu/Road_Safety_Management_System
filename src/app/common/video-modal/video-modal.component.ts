import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../models.model';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent implements OnInit,AfterViewInit {
   @Input() public Data:any
   @Input() public  SelectedId:string
  @Input() public modalConfig?:any 
  @Input() public IP:any
  @Output()public closeModal= new EventEmitter()
 // @ViewChild('modal') modalContainer:TemplateRef<any>
  @ViewChild('carousal') carousal:NgbCarousel

constructor(private modalService:NgbModal,public config: NgbCarouselConfig){
 
  config.wrap=false
  config.pauseOnFocus=true
  config.pauseOnHover=true
  config.interval=0
}

ngOnInit(): void {
}
ngAfterViewInit(): void {
  this.carousal.select(this.SelectedId)

}
Close(){
  this.closeModal.emit()
  //this.carousal.activeId=this.SelectedId
  
 
}

}
