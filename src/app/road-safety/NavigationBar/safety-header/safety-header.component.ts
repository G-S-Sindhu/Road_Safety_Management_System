import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-safety-header',
  templateUrl: './safety-header.component.html',
  styleUrls: ['./safety-header.component.css']
})
export class SafetyHeaderComponent {



  isCollapse:boolean=false
  viewPortWidth:any
  constructor(private router:Router,public server:ServerService,public modalService:NgbModal) {
    this.viewPortWidth=window.innerWidth
    console.log(this.viewPortWidth)
   // console.log(this.isCollapse,'collapse')
   }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.viewPortWidth=window.innerWidth

    if(localStorage.getItem('isCollapse')=='true'){
      this.isCollapse=true
      var sidebarWrapper=document.getElementById('sidebarWrapper')
  var sidebar=document.getElementById('sidebar')
  var header=document.getElementById('header')
  var footer=document.getElementById('footer')
  var wrapper=document.getElementsByClassName('dashboard-wrapper')[0]
  header.classList.toggle('active')
  sidebar.classList.toggle('active')
  footer.classList.toggle('active')
  wrapper.classList.toggle('active')
  this.server.isCollapse.next(true)
    }
    else{
      this.isCollapse=false
    }
    console.log('iscollapse',this.isCollapse)
  }
  Logout(){
    this.modalService.dismissAll()
    localStorage.removeItem('session')
    console.log('logout')
    this.router.navigate(['/login'])
  
}

toggleSidebar(){
  this.isCollapse=!this.isCollapse
  localStorage.setItem('isCollapse',this.isCollapse==true?'true':'false')
  var sidebarWrapper=document.getElementById('sidebarWrapper')
  var sidebar=document.getElementById('sidebar')
  var header=document.getElementById('header')
  var footer=document.getElementById('footer')
  var wrapper=document.getElementsByClassName('dashboard-wrapper')[0]
  console.log(wrapper)
//  sidebarWrapper.classList.toggle('active')
  header.classList.toggle('active')
  sidebar.classList.toggle('active')
  footer.classList.toggle('active')
  wrapper.classList.toggle('active')
  this.server.isCollapse.next(this.isCollapse)
}

LogoutModal(modal:any){
  this.modalService.open(modal,{centered:true})
}

}
