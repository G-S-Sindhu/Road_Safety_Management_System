"use strict";(self.webpackChunkDOCKETRUN=self.webpackChunkDOCKETRUN||[]).push([[830],{1830:(j,h,r)=>{r.r(h),r.d(h,{SmartVideoRecorderModule:()=>N});var C=r(9569),u=r(1954),f=r(64),_=r(9174),d=r(9646),e=r(4650),g=r(2953),b=r(9266),m=r(6895),p=r(433),x=r(3868),v=r(4153);const V=["carousal"];function y(a,l){if(1&a&&(e.\u0275\u0275elementStart(0,"div",11)(1,"video",12),e.\u0275\u0275element(2,"source",13),e.\u0275\u0275elementEnd()()),2&a){const t=e.\u0275\u0275nextContext(2).$implicit,n=e.\u0275\u0275nextContext(2);e.\u0275\u0275advance(2),e.\u0275\u0275property("src",n.IP+"/getviolationvideo/"+t.video_name,e.\u0275\u0275sanitizeUrl)}}function M(a,l){1&a&&(e.\u0275\u0275elementStart(0,"div",14),e.\u0275\u0275text(1,"No Recordings"),e.\u0275\u0275elementEnd())}function D(a,l){if(1&a&&(e.\u0275\u0275template(0,y,3,1,"div",7),e.\u0275\u0275template(1,M,2,0,"ng-template",null,8,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275elementStart(3,"div",9)(4,"div")(5,"span"),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"div")(8,"span",10),e.\u0275\u0275text(9,"Camera Name :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"b"),e.\u0275\u0275text(11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(12,"div")(13,"span",10),e.\u0275\u0275text(14,"Camera IP :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"b"),e.\u0275\u0275text(16),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(17,"div")(18,"span",10),e.\u0275\u0275text(19,"Coin ID :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(20,"b"),e.\u0275\u0275text(21),e.\u0275\u0275elementEnd()()()),2&a){const t=e.\u0275\u0275reference(2),n=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275property("ngIf",null!=n.video_name)("ngIfElse",t),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate1("SI Number: ",n.SNo," "),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(n.cameraname),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(n.camera_ip),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(n.coinid)}}function I(a,l){if(1&a&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275template(1,D,22,6,"ng-template",6),e.\u0275\u0275pipe(2,"json"),e.\u0275\u0275elementContainerEnd()),2&a){const t=l.index;e.\u0275\u0275advance(1),e.\u0275\u0275property("id",e.\u0275\u0275pipeBind1(2,1,t))}}function E(a,l){if(1&a&&(e.\u0275\u0275elementStart(0,"ngb-carousel",3,4),e.\u0275\u0275template(2,I,3,3,"ng-container",5),e.\u0275\u0275elementEnd()),2&a){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("ngForOf",t.Data)}}let w=(()=>{class a{constructor(t,n){this.modalService=t,this.config=n,this.closeModal=new e.EventEmitter,n.wrap=!1,n.pauseOnFocus=!0,n.pauseOnHover=!0,n.interval=0}ngOnInit(){}ngAfterViewInit(){this.carousal.select(this.SelectedId)}Close(){this.closeModal.emit()}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275directiveInject(g.FF),e.\u0275\u0275directiveInject(g.Lu))},a.\u0275cmp=e.\u0275\u0275defineComponent({type:a,selectors:[["app-video-modal"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(V,5),2&t){let o;e.\u0275\u0275queryRefresh(o=e.\u0275\u0275loadQuery())&&(n.carousal=o.first)}},inputs:{Data:"Data",SelectedId:"SelectedId",modalConfig:"modalConfig",IP:"IP"},outputs:{closeModal:"closeModal"},decls:3,vars:1,consts:[[1,"d-flex","justify-centent-center","align-items-center",2,"width","inherit","height","inherit"],[1,"video-modal"],["data-interval","false","class","","style","height:100%;width: 100%;",4,"ngIf"],["data-interval","false",1,"",2,"height","100%","width","100%"],["carousal","ngbCarousel"],[4,"ngFor","ngForOf"],["ngbSlide","",3,"id"],["class","video-container d-flex justify-centent-center",4,"ngIf","ngIfElse"],["noVideo",""],[1,"carousel-caption"],[1,"text"],[1,"video-container","d-flex","justify-centent-center"],["height","70%","width","70%","preload","none","controls","",1,"custom-video",2,"width","90% !important","height","75% !important"],["type","video/mp4",3,"src"],[1,"video-container","alert","alert-warning"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1),e.\u0275\u0275template(2,E,3,1,"ngb-carousel",2),e.\u0275\u0275elementEnd()()),2&t&&(e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",n.Data))},dependencies:[m.NgForOf,m.NgIf,g.uo,g.xl,m.JsonPipe],styles:[".video-modal[_ngcontent-%COMP%]{display:flex!important;width:100%!important;height:100%!important;flex-direction:row;position:relative;justify-content:center!important;align-items:center!important}.video-container[_ngcontent-%COMP%]{display:flex;align-items:center!important;justify-content:center!important;width:100%;height:80%!important;margin-bottom:6.1rem!important;padding:2rem!important;overflow:auto}.modal[_ngcontent-%COMP%]{--bs-modal-bg:transparent}.modal-header[_ngcontent-%COMP%]{background-color:transparent!important;color:#fff}.carousal[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.carousel-item.active[_ngcontent-%COMP%]{display:flex!important;justify-content:center!important;align-items:center!important}.custom-video[_ngcontent-%COMP%]{width:60rem!important;height:30rem}"]}),a})();const O=["modal"];function P(a,l){if(1&a){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"button",40),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const o=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(o.Reset())}),e.\u0275\u0275text(1,"Reset"),e.\u0275\u0275elementEnd()}}function T(a,l){if(1&a){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"tr",41)(1,"td"),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"td"),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"td"),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"td"),e.\u0275\u0275text(8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"td")(10,"div",42),e.\u0275\u0275listener("click",function(){const i=e.\u0275\u0275restoreView(t).$implicit,s=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(s.openVideoModal(i.SNo))}),e.\u0275\u0275element(11,"fa-icon",43),e.\u0275\u0275elementEnd()()()}if(2&a){const t=l.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.SNo),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.coinid),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.cameraname),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.camera_ip)}}function k(a,l){if(1&a){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",44)(1,"h3"),e.\u0275\u0275text(2,"Smart Video Recordings"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"button",45),e.\u0275\u0275listener("click",function(){const i=e.\u0275\u0275restoreView(t).$implicit;return e.\u0275\u0275resetView(i.close("Cross click"))}),e.\u0275\u0275elementStart(4,"span",46),e.\u0275\u0275text(5,"\xd7"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(6,"div",47)(7,"div",48)(8,"div",49)(9,"app-video-modal",50),e.\u0275\u0275listener("closeModal",function(o){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(i.modalClose(o))}),e.\u0275\u0275pipe(10,"async"),e.\u0275\u0275elementEnd()()()()}if(2&a){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(9),e.\u0275\u0275property("SelectedId",e.\u0275\u0275pipeBind1(10,3,t.selectedVideoId))("Data",t.videoData)("IP",t.IP)}}const S=function(){return{standalone:!0}},L=[{path:"",component:(()=>{class a{constructor(t,n,o){this.modalService=t,this.SmartVideoService=n,this.Datepipe=o,this.IP="",this.selectedVideoId=(0,d.of)(""),this.pageSize=10,this.collectionSize=4,this.page=0,this.selectedDate="",this.selectedCoin=" ",this.selectedCam=" ",this.isLive=null,this.videoData=[],this.violationDetails=(0,d.of)([]),this.tempData=[],this.coinIdList=(0,d.of)([]),this.cameraList=(0,d.of)([]),this.total=(0,d.of)(4),this.IP=this.SmartVideoService.IP,this.intervalValue=this.SmartVideoService.intervalValue}ngOnInit(){this.SmartVideoService.GetSensgizViolByFilters(this.selectedDate?this.selectedDate:" ",this.selectedCam?this.selectedCam:" ",this.selectedCoin?this.selectedCoin:" ").subscribe(t=>{console.log(t),this.table&&this.table.classList.remove("loading"),!0===t.success?(this.tempData=t.message,this.sliceData()):(this.SmartVideoService.notification(t.message),this.tempData=[],this.sliceData())},t=>{this.SmartVideoService.notification("Error while fetching the data","Retry"),this.table&&this.table.classList.remove("loading"),this.SmartVideoService.notification("Error while Fetching the Data","Retry")}),this.GetApplicationStatus(),this.interval=setInterval(()=>{this.GetViolData(),this.GetApplicationStatus()},this.intervalValue),this.GetCoinIdList(),this.GetCameraList()}dateUpdated(t){console.log(t)}OnCoinIdSelect(t){}OnCameraSelect(t){}openVideoModal(t){this.selectedVideoId=(0,d.of)(String(t-1)),this.videoData=[...this.tempData],setTimeout(()=>{this.modalService.open(this.modalComponent,{centered:!0,size:"xl"})})}modalClose(t){console.log("close event enitted"),this.modalService.dismissAll()}ngAfterViewInit(){this.table=document.getElementById("dataTable"),this.selectedDate=this.Datepipe.transform(new Date,"YYYY-MM-dd")}GetCoinIdList(){var t=[],n=[{key:0,label:"All Coin Id",data:" "}];this.SmartVideoService.GetCoinIdList().subscribe(o=>{!0===o.success&&(o.message.forEach((i,s)=>{t.push({d:s,data:i})}),console.log(t),t=t.filter((i,s,c)=>s===c.indexOf(i)),console.log(t),t.forEach((i,s)=>{var c;console.log(i),c={key:(s+1).toString(),label:i.data,data:i.data},n.push(c)}),console.log(n),this.coinIdList=(0,d.of)(n))})}GetCameraList(){var t=[],n=[{key:0,label:"All Camera",data:" "}];this.SmartVideoService.GetCameraList().subscribe(o=>{!0===o.success&&(o.message.forEach((i,s)=>{t.push({d:s,data:i})}),console.log(t),t=t.filter((i,s,c)=>s===c.indexOf(i)),console.log(t),t.forEach((i,s)=>{var c;console.log(i),c={key:(s+1).toString(),label:i.data,data:i.data},n.push(c)}),console.log(n),this.cameraList=(0,d.of)(n))})}Reset(){this.selectedCam=" ",this.selectedCamera=null,this.selectedCoin=" ",this.selectedCoinId=null,this.selectedMoments=null,this.selectedDate=" ",this.GetViolData()}GetViolData(){return this.SmartVideoService.GetSensgizViolByFilters(this.selectedDate?this.selectedDate:" ",this.selectedCam?this.selectedCam:" ",this.selectedCoin?this.selectedCoin:" ").subscribe(t=>{console.log(t),this.table&&this.table.classList.remove("loading"),!0===t.success?(this.tempData=t.message,this.sliceData()):(this.tempData=[],this.sliceData())},t=>{this.table&&this.table.classList.remove("loading")})}sliceData(){this.total=(0,d.of)(this.tempData.slice((this.page-1)*this.pageSize,(this.page-1)*this.pageSize+this.pageSize).length),this.total=(0,d.of)(this.tempData.length),this.violationDetails=(0,d.of)(this.tempData.map((t,n)=>({SNo:n+1,...t})).slice((this.page-1)*this.pageSize,(this.page-1)*this.pageSize+this.pageSize))}GetApplicationStatus(){this.SmartVideoService.CheckApplicationStatus().subscribe(t=>{if(t.success){var n=t.message.find(o=>"smrec"==o.process_name?o:"");this.isLive=n.process_status}})}datesUpdated(t){this.table&&this.table.classList.add("loading"),console.log(t),this.selectedDate=null!=t.startDate?t.startDate.format("YYYY-MM-DD"):this.Datepipe.transform(new Date,"YYYY-MM-dd"),console.log(this.selectedDate),this.GetViolData()}OnCoinSelect(t){this.selectedCoin=this.selectedCoinId.data,console.log(this.selectedCoin),this.table&&this.table.classList.add("loading"),this.GetViolData()}onCameraSelect(t){this.selectedCam=this.selectedCamera.data,this.table.classList.add("loading"),this.GetViolData()}StartApplication(){this.SmartVideoService.StartApplication().subscribe(t=>{this.SmartVideoService.notification(t.message)})}ngOnDestroy(){clearInterval(this.interval)}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275directiveInject(g.FF),e.\u0275\u0275directiveInject(b.m),e.\u0275\u0275directiveInject(m.DatePipe))},a.\u0275cmp=e.\u0275\u0275defineComponent({type:a,selectors:[["app-smart-vedio"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(O,5),2&t){let o;e.\u0275\u0275queryRefresh(o=e.\u0275\u0275loadQuery())&&(n.modalComponent=o.first)}},decls:72,vars:34,consts:[[1,"container-fluid","dashboard-content"],[1,"page-header"],[1,"row"],[1,"col-12"],[1,"float-end"],[1,"text-muted"],[3,"ngClass"],[1,"row","mb-3"],[1,"col-xl-12","mb-3"],["id","data-card",1,"d-flex","flex-row","align-items-center","mb-2","mt-4","card","p-2",2,"border-radius","7px !important"],[1,""],[1,"container","p-3"],["icon","filter"],[1,"col-5"],[1,"row","d-flex","align-items-center"],[1,"col-4"],[1,"me-1","ms-2","date-picker"],["ngxDaterangepickerMd","","placeholder","Select Date","required","",1,"form-control",3,"timePicker","singleDatePicker","ngModel","datesUpdated","ngModelChange"],["datepicker",""],["icon","calendar"],["id","filter",1,"col-4"],["containerStyleClass","w-full","placeholder","Select Coin Id",1,"w-100",3,"ngModel","ngModelOptions","options","ngModelChange","onNodeSelect"],["containerStyleClass","w-full","placeholder","Select Camera Name",1,"w-100",3,"ngModel","ngModelOptions","options","ngModelChange","onNodeSelect"],["class","btn default-tertiary ms-3 me-3",3,"click",4,"ngIf"],["id","data-card",1,"card"],[1,"card-header"],[1,"float-start"],[1,"text-dark"],["track","horizontal","pointerEventsMethod","scrollbar",3,"autoHeightDisabled","disabled"],["scrollable",""],["id","dataTable",1,"table","table-bordered","mt-3",2,"max-width","100%","overflow-x","scroll","border-radius","10px !important"],["scope","col",2,"border-radius","10px !important"],["scope","col"],["class","p-3",4,"ngFor","ngForOf"],[1,"d-flex","mx-auto","justify-content-center","p-1"],[2,"width","95vw","overflow-x","auto",3,"collectionSize","page","pageSize","pageChange"],[1,"d-flex","mx-auto","justify-content-start"],[1,"form-select",2,"width","auto",3,"ngModel","ngModelChange"],[3,"ngValue"],["modal",""],[1,"btn","default-tertiary","ms-3","me-3",3,"click"],[1,"p-3"],[1,"btn-icon",3,"click"],["icon","video"],[1,"modal-header"],["type","button","aria-label","Close",1,"btn","default-tertiary","close","float-end",3,"click"],["aria-hidden","true",1,"font-primary"],[1,"modal-content"],[1,"d-flex","justify-centent-center","align-items-center",2,"width","100%","height","100%"],[2,"width","100%","height","100%"],[3,"SelectedId","Data","IP","closeModal"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"div",0)(1,"h3",1),e.\u0275\u0275text(2," Smart Video Recording "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"div",2)(4,"div",3)(5,"div",4)(6,"span",5),e.\u0275\u0275text(7,"Application Status :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"span",6),e.\u0275\u0275text(9),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"div",11),e.\u0275\u0275element(15,"fa-icon",12),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(16,"div",13)(17,"div",14)(18,"span",15)(19,"div",16)(20,"input",17,18),e.\u0275\u0275listener("datesUpdated",function(i){return n.dateUpdated(i)})("datesUpdated",function(i){return n.datesUpdated(i)})("ngModelChange",function(i){return n.selectedMoments=i}),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(22,"fa-icon",19),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(23,"span",20)(24,"p-treeSelect",21),e.\u0275\u0275listener("ngModelChange",function(i){return n.selectedCoinId=i})("onNodeSelect",function(i){return n.OnCoinSelect(i)}),e.\u0275\u0275pipe(25,"async"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(26,"span",20)(27,"p-treeSelect",22),e.\u0275\u0275listener("ngModelChange",function(i){return n.selectedCamera=i})("onNodeSelect",function(i){return n.onCameraSelect(i)}),e.\u0275\u0275pipe(28,"async"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275template(29,P,2,0,"button",23),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(30,"div",24)(31,"div",25)(32,"div",10)(33,"h5",26),e.\u0275\u0275text(34," Recording Details"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(35,"span",4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(36,"div",4)(37,"span",5),e.\u0275\u0275text(38,"Date :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(39,"span",27),e.\u0275\u0275text(40),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(41,"ng-scrollbar",28,29)(43,"table",30)(44,"thead")(45,"tr")(46,"th",31),e.\u0275\u0275text(47," SI no "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(48,"th",32),e.\u0275\u0275text(49,"Coin ID"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(50,"th",32),e.\u0275\u0275text(51,"Camera Name"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(52,"th",32),e.\u0275\u0275text(53,"Camera IP"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(54,"th",32),e.\u0275\u0275text(55,"Video"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(56,"tbody"),e.\u0275\u0275template(57,T,12,4,"tr",33),e.\u0275\u0275pipe(58,"async"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(59,"div",34)(60,"ngb-pagination",35),e.\u0275\u0275listener("pageChange",function(i){return n.page=i})("pageChange",function(){return n.sliceData()}),e.\u0275\u0275pipe(61,"async"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(62,"div",36)(63,"select",37),e.\u0275\u0275listener("ngModelChange",function(i){return n.pageSize=i})("ngModelChange",function(){return n.sliceData()}),e.\u0275\u0275elementStart(64,"option",38),e.\u0275\u0275text(65,"10"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(66,"option",38),e.\u0275\u0275text(67,"15"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(68,"option",38),e.\u0275\u0275text(69,"20"),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275template(70,k,11,5,"ng-template",null,39,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275elementEnd()()),2&t&&(e.\u0275\u0275advance(8),e.\u0275\u0275property("ngClass",null!=n.isLive?n.isLive?"success-badge":"danger-badge":""),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.isLive?"Running":"Stopped"),e.\u0275\u0275advance(11),e.\u0275\u0275property("timePicker",!0)("singleDatePicker",!0)("timePicker",!1)("ngModel",n.selectedMoments),e.\u0275\u0275advance(4),e.\u0275\u0275property("ngModel",n.selectedCoinId)("ngModelOptions",e.\u0275\u0275pureFunction0(32,S))("options",e.\u0275\u0275pipeBind1(25,24,n.coinIdList)),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngModel",n.selectedCamera)("ngModelOptions",e.\u0275\u0275pureFunction0(33,S))("options",e.\u0275\u0275pipeBind1(28,26,n.cameraList)),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf"," "!=n.selectedCam||" "!=n.selectedCoin||null!=n.selectedMoments.startDate),e.\u0275\u0275advance(11),e.\u0275\u0275textInterpolate(n.selectedDate),e.\u0275\u0275advance(1),e.\u0275\u0275property("autoHeightDisabled",!1)("disabled",!1),e.\u0275\u0275advance(16),e.\u0275\u0275property("ngForOf",e.\u0275\u0275pipeBind1(58,28,n.violationDetails)),e.\u0275\u0275advance(3),e.\u0275\u0275property("collectionSize",e.\u0275\u0275pipeBind1(61,30,n.total))("page",n.page)("pageSize",n.pageSize),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngModel",n.pageSize),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngValue",10),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngValue",15),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngValue",20))},dependencies:[p.YN,p.Kr,p.Fj,p.EJ,p.JJ,p.Q7,x.BN,m.NgClass,m.NgForOf,m.NgIf,p.On,g.N9,u.SP,f.mP,v.KC,w,m.AsyncPipe],styles:["#data-card.card[_ngcontent-%COMP%]{box-shadow:none!important;border-radius:10px!important}.date-picker[_ngcontent-%COMP%]{position:relative;border:2px solid var(--gray-light);background-color:#fff!important;padding:5px;border-radius:10px;display:flex;height:2.9rem;justify-content:space-between;align-items:center;box-shadow:-5px -5px 9px #ffffff73,5px 5px 8px #5e68794d!important}.container[_ngcontent-%COMP%]{position:relative;background-color:#fff!important;opacity:1;padding:5px;border-radius:10px;border:1px solid #ccc;display:flex;height:2.9em;justify-content:space-between;align-items:center;box-shadow:5px 5px 8px #5e68794d!important}.date-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none!important}.date-picker[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:.4rem!important}.date-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:active{box-shadow:none!important;border:none}ngb-pagination[_ngcontent-%COMP%]     ul>li:not(.active)>a{background-color:#f8f8f8!important;border-radius:5px!important;color:var(--label-color)!important;box-shadow:none}ngb-pagination[_ngcontent-%COMP%]     ul>li.active>a{background-color:var(--label-color)!important;border-radius:5px!important;border:1px solid var(--label-color)!important;box-shadow:none}thead[_ngcontent-%COMP%]{background-color:#e6eef4!important;height:3.5rem;text-align:center;border-radius:10px!important}td[_ngcontent-%COMP%]{text-align:center!important;height:2rem!important}"]}),a})()}];let N=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[_.A,C.Bz.forChild(L),u.n1.forRoot({}),f.o6,v.kb]}),a})()}}]);