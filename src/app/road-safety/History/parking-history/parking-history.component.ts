import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { Router } from "@angular/router";
import { Observable, of,  Subscription, switchMap } from "rxjs";
import {
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from "file-saver";
0;
import { MatSnackBar } from "@angular/material/snack-bar";
import { Moment } from "moment";
import dayjs from "dayjs/esm";
import { ParkingHistoryService } from "./parking-history.service";
import { RadarController } from "chart.js";

@Component({
  selector: 'app-parking-history',
  templateUrl: './parking-history.component.html',
  styleUrls: ['./parking-history.component.css']
})

export class ParkingHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  parkingTypeList: Observable<any[]> = of([]);
violationTypeList:Observable<any[]> = of([]);
  selectedParkingType:any | null = null;
  selectedViolationType:any |null  = null;
  isLatestvpmsData :boolean = false;
    isdatewise: boolean = false;
    loaderLatest: boolean = false;
    ranges: any = {
        Today: [dayjs().hour(0).minute(0).second(0), dayjs()],
        Yesterday: [
          dayjs().subtract(1, "days").hour(0).minute(0).second(0),
          dayjs().subtract(1, "days"),
        ],
        "Last 7 Days": [
          dayjs().subtract(6, "days").hour(0).minute(0).second(0),
          dayjs(),
        ],
        "Last 30 Days": [
          dayjs().subtract(29, "days").hour(0).minute(0).second(0),
          dayjs(),
        ],
        "This Month": [
          dayjs().startOf("month").hour(0).minute(0).second(0),
          dayjs().endOf("month"),
        ],
        "Last Month": [
          dayjs().subtract(1, "month").startOf("month").hour(0).minute(0).second(0),
          dayjs().subtract(1, "month").endOf("month"),
        ],
      };
      selectedMoments: { startDate: Moment; endDate: Moment } = null;
      selectedDepartment: any | null = null;
      dropdownList1: Observable<any[]> = of([]);
      selectedCameraId: any | null = null;
      dropdownList: Observable<any[]> = of([]);

      loading: boolean = false;
      isLatest: boolean = false;
      loader2: boolean = false;
    //   isEditTable: boolean = true;
      vpmsData:any[] = [];
      latestvpmsData:any[] = [];
      dataFetchStatus: string = "init";


      delay: number;
      API: any;
      ExcelRange: number;
      violLength: number = 0;
      latest: boolean = false;
      // tempdata: any[] = [];
    //   total: Observable<number> = of(0);
      violData: Observable<any[]> = of([]);
      prevLiveCount: number = 0;
      // imageData: any[] = [];
      isdate: boolean = false;
      Subsciption!: Subscription;

  data: any[] = [];
  String: any = String;
  isalert: boolean = false;
  
 
  page: number = 1;
  pageSize: number = 30;
  collectionSize: number;
  cameraDetails: any[] = [];
  audioOff: boolean = false;
  alertmessage: string = "";
  
  
  
  excelLoader: boolean = false;
  
  currentViol!: any;
  show1: number = 30;
  show2: number = 40;
  show3: number = 50;
  fromDate: any = new Date();
  toDate: any = new Date();
  
  
  interval: any;
  
  excelBlob: any;
  Excel: boolean = false;
  isExcel: boolean = false;
  excelLoad: boolean = false;
  alert: boolean = true;
 
  
  
 
  objectKeys = Object.keys;
 
  
  
  
  Images: any[] = [];
  selectedItems: any = null;
  selectedItems1: any = null;
  analyticsType:string='RA'
  // violationTypeList: Observable<any[]> = of([
  //   { key: "0", label: "All Violations", icon: "pi", data: "all_violations" },
  // ]);
  dropdownSettings2: any;
  
  
 
  selectedViolation: any;
 
  violationsList: any[] = [];
 

  
  editViol: any;

  constructor(
    private http: HttpClient,
    private webServer: ParkingHistoryService,
    private datepipe: DatePipe,
    private _lightbox: Lightbox,
    private _lightBoxConfig: LightboxConfig,
    private snackbar: MatSnackBar,
    public modalService: NgbModal,

  ) {
    this.delay = this.webServer.logInterval;
    this.API = webServer.IP;
    this.ExcelRange = 0;
    this.getCameraList();
    this.getDepartmentList();
    this.getParkingTypeList();
    this.getViolationList();
    

    //.............lightbox configaration...........

    this._lightBoxConfig.showDownloadButton = false;
    this._lightBoxConfig.showZoom = true;
    this._lightBoxConfig.showImageNumberLabel = true;
    this._lightBoxConfig.fitImageInViewPort = true;
    this._lightBoxConfig.disableScrolling = false;
    this._lightBoxConfig.centerVertically = false;

    //..............................................

    
  }

  ngOnInit(): void {

    //...........Reading previous violation data's length from local storage....
    this.violLength = Number(localStorage.getItem("updatedLen"));

    if (!this.latest || !this.isLatest) {
      
      this.webServer.LiveRAViolationData().subscribe(
        (Rdata: any) => {
          
          if (Rdata.success) {
            
            // this.tempdata = Rdata.message;
            // this.total = of(this.tempdata.length);
            this.violData = of(Rdata.message);
            this.vpmsData = Rdata.message;
            // console.log('this is from the ng on init  ',this.vpmsData)
            // this.sliceVD();
            this.prevLiveCount = Rdata.now_live_count;
            // this.imageData = Rdata.message;
          } else {
            
            this.dataFetchStatus = "success";
            this.notification(Rdata.message);
          }
        },
        (err) => {
          this.dataFetchStatus = "Error";
          this.notification("Error While fetching the data");
        }
      );
    }
    
  }

  ngAfterViewInit() {
    // this.dataread();
  }

  public dataread() {

    this.interval = setInterval(() => {

      if (!this.isdate) {

        this.Subsciption = this.webServer
          .LiveRAViolationData(
            this.selectedCameraId ? this.selectedCameraId.data : null,
            this.selectedDepartment ? this.selectedDepartment.data : null
          )
          .subscribe(
            (Rdata: any) => {
              this.dataFetchStatus = "success";
              if (Rdata.success && !this.isdate && !this.latest) {
                var response = { ...Rdata };
                var cviol = [...Rdata.message];
                if (response.now_live_count - this.prevLiveCount > 0) {
                  this.prevLiveCount = response.now_live_count;
                  // this.imageData = cviol;
                  // this.tempdata = cviol;
                  // this.total = of(this.violdata.length);
                  this.loader2 = false;
                  this.isdatewise = false;
                //   this.sliceVD();
                } else {
                }
              }
            },
            (Err) => {
              this.dataFetchStatus = "Error";
            }
          );
      }
    }, this.delay);
  }

  LatestHistory(){
    
      this.webServer.LatestHistory().subscribe((response:any) =>{
        this.dataFetchStatus = 'init'
        if(response.success){
          this.dataFetchStatus = 'Loading'
          this.isLatestvpmsData = true
          this.vpmsData = []
          this.latestvpmsData = response.message
        }
        else{
          this.dataFetchStatus = 'success'
          this.isLatestvpmsData = false
          this.latestvpmsData = []
        }
        
      })

    }
    

  OnlyParking(){
    this.isLatestvpmsData = false
    this.webServer.OnlyParking().subscribe((response:any) =>{
      this.dataFetchStatus = 'init'
      if(response.success){
        this.dataFetchStatus = 'Loading'
        this.vpmsData= response.message
      }
      else{
        this.vpmsData = []
        this.dataFetchStatus = "success"
      }

      
    })
  }

  OnlyNo_Parking(){
    this.isLatestvpmsData = false
    this.webServer.OnlyNo_Parking().subscribe((response:any) =>{
      this.dataFetchStatus = 'init'
      if(response.success){
        this.dataFetchStatus = 'Loading'
        this.vpmsData= response.message
      }
      else{
        this.dataFetchStatus = 'success'
        this.vpmsData = []
      }
    })
  }


  Violations(){
    this.isLatestvpmsData = false
    this.webServer.Violations().subscribe((response:any) =>{
       this.dataFetchStatus = 'init'
      if(response.success){
        this.vpmsData= response.message
      }
      else{
        this.dataFetchStatus = 'success'
        this.vpmsData = []
      }
      
    })
  }

  RefreshViolations(){
    // this.total=of(0)
    this.page=1
    this.violData=of([])
    this.isdatewise=false
    this.isdate=false
    this.isLatest=false
    this.latest=false
    this.dataFetchStatus='init'

      this.webServer.LiveRAViolationData().subscribe(
        (Rdata: any) => {
          this.dataFetchStatus = "success";

          if (Rdata.success) {
            // this.tempdata = Rdata.message;
            // this.total = of(this.tempdata.length);
            this.vpmsData = Rdata.message
            this.violData = of(Rdata.message);
            // this.sliceVD();
            this.prevLiveCount = Rdata.now_live_count;
            // this.imageData = Rdata.message;
          } else {
            this.notification(Rdata.message);
          }
        },
        (err) => {
          this.dataFetchStatus = "Error";
          this.notification("Error While fetching the data");
        }
      );
    
  }


  openDatePicker(event: any) {
    var dateInput = document.getElementById("dateInput");
    dateInput.click();
  }

  Submit() {
    this.dataFetchStatus = "init";

    // this.zone.run(() => {
    // this.cd.detectChanges()
    // clearInterval(this.interval);
    this.isLatest = false;
   this.violData=of([])
//    this.total=of(0)
   this.page=1
    this.Images = [];
    this.fromDate = this.selectedMoments.startDate.format(
      "YYYY-MM-DD HH:mm:ss"
    );
    this.toDate = this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss");
    this.getParkingTypeList()
    this.getCameraList();
    this.getDepartmentList();
    this.getViolationList();
    this.Subsciption ? this.Subsciption.unsubscribe() : "";

    this.pageSize = 30;
    this.page = 1;

    this.isdate = true;
    this.loading = true;
    this.webServer
      .DatewiseRAViolations(
        this.fromDate,
        this.toDate,
        null,
        null,
        this.selectedDepartment ? this.selectedDepartment.data : null,
        this.selectedCameraId ? this.selectedCameraId.data : null,
        this.selectedParkingType? this .selectedParkingType.data :null,
        this.selectedViolationType?this.selectedViolationType.data:null

      )
      .subscribe(
        (Response: any) => {
          if (Response.success) {
            // this.cd.detectChanges()
            this.vpmsData=Response.message
            if (Response.message.length == 0) {
              // this.tempdata = [];
              this.violData = of([]);
              this.loading = false;
              this.loader2 = false;

              this.isdatewise = true;
            //   this.total = of(0);
              this.notification(
                "No violations found for entered date and time"
              );
            }
            if (Response.message.length > 0) {
              // this.imageData = Response.message;
            //   this.total = of(Response.message.length);
              this.webServer
                .DatewiseRAViolations(
                  this.fromDate,
                  this.toDate,
                  this.page,
                  this.pageSize,
                  this.selectedDepartment ? this.selectedDepartment.data : null,
                  this.selectedCameraId ? this.selectedCameraId.data : null,
                  this.selectedParkingType? this .selectedParkingType.data :null,
                  this.selectedViolationType?this.selectedViolationType.data:null

                )
                .subscribe(
                  (Response: any) => {
                    this.loading = false;
                    this.dataFetchStatus = "success";

                    if (Response.success) {
                        this.vpmsData = Response.message
                      if (Response.message.length === 0) {
                        this.dataFetchStatus = "success";
                        this.notification("No violations found");
                        this.violData = of([]);
                        // this.tempdata = [];
                        this.isdatewise = true;
                        this.loading = false;
                      } else {
                        // this.tempdata = Response.message;
                        this.isdatewise = true;
                        // this.sliceVD();

                        this.loading = false;
                      }
                    }
                    else {
                      this.loading = false;
                      this.violData = of([]);
                    //   this.total=of(0)
                      this.dataFetchStatus = "success";
                      this.notification(Response.message);
                    }
                  },
                  (err) => {
                    this.loading = false;
                    //  this.cd.()
                    this.dataFetchStatus = "Error";
                    this.notification("Error while fetching the data");
                  }
                );
            }
          } else {
            // this.tempdata = [];
            this.violData = of([]);
            this.loading = false;
            this.isdatewise = true;
            // this.cd.detectChanges()
            // this.total = of(0);

            this.dataFetchStatus = "success";
            this.notification("No violations found");
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
          this.dataFetchStatus = "Error";
        }
      );
    // });
  }

  onDepartmentIdSelect(event: any) {
    this.dataFetchStatus='init'
    this.page=1
    this.pageSize=30
    // this.total=of(0)
     this.violData=of([])
    !this.isdatewise ? (this.page = 1) : "";
    // this.selectedCameraId = this.selectedItems.data;
    if (!this.isdatewise) {
      this.webServer
        .LiveRAViolationData(
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null
        )
        .subscribe(
          (Rdata: any) => {
            if (Rdata) {
              this.dataFetchStatus = "success";

              this.isLatest = false;
              // table?.classList.remove("loading");
              
              if (!Rdata.success) {
                this.notification(Rdata.message);
                this.dataFetchStatus = "success";
                // this.imageData = Rdata.message;
            //   this.total = of(Rdata.message.length);
              // this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
            //   Rdata.success
            //     ? (this.tempdata = Rdata.message)
            //     : (this.tempdata = []);
            // //   this.sliceVD();
              this.loader2 = false;
              this.isdatewise = false;
              
            }
          },
          (Err) => {
            this.dataFetchStatus='Error'
            this.loader2 = false;
          }
        );
    } else {
      this.Submit();
    }
    // this.dataread();
  }
  
  onCameraIdSelect(event: any) {
    this.dataFetchStatus='init'
    this.page=1
    this.pageSize=30
    // this.total=of(0)
     this.violData=of([])
    !this.isdatewise ? (this.page = 1) : "";
    // this.selectedCameraId = this.selectedItems.data;
    if (!this.isdatewise) {
      this.webServer
        .LiveRAViolationData(
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null
        )
        .subscribe(
          (Rdata: any) => {
            if (Rdata) {
              this.dataFetchStatus = "success";

              this.isLatest = false;
              // table?.classList.remove("loading");
              
              if (!Rdata.success) {
                this.notification(Rdata.message);
                this.dataFetchStatus = "success";
                // this.imageData = Rdata.message;
            //   this.total = of(Rdata.message.length);
              // this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
              // Rdata.success
              //   ? (this.tempdata = Rdata.message)
              //   : (this.tempdata = []);
            //   this.sliceVD();
              this.loader2 = false;
              this.isdatewise = false;
              
            }
          },
          (Err) => {
            this.dataFetchStatus='Error'
            this.loader2 = false;
          }
        );
    } else {
      this.Submit();
    }
    // this.dataread();
  }

  OnParkingTypeSelect(){
    this.dataFetchStatus='init'
    // this.page=1
    // this.pageSize=30
    // // this.total=of(0)
    //  this.violData=of([])
    // !this.isdatewise ? (this.page = 1) : "";
    // this.selectedCameraId = this.selectedItems.data;
    if (this.isdatewise) {
      this.webServer
        .DatewiseRAViolations(
          this.fromDate,
          this.toDate,
          this.page,
          this.pageSize,
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null,
          this.selectedParkingType? this .selectedParkingType.data :null,
          this.selectedViolationType?this.selectedViolationType.data:null

        )
        .subscribe(
          (Rdata: any) => {
            if (Rdata) {
              this.dataFetchStatus = "success";

              this.isLatest = false;
              // table?.classList.remove("loading");
              this.vpmsData = Rdata.message
              if (!Rdata.success) {
                this.notification(Rdata.message);
                this.dataFetchStatus = "success";
                // this.imageData = Rdata.message;
            //   this.total = of(Rdata.message.length);
              // this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
              // Rdata.success
              //   ? (this.tempdata = Rdata.message)
              //   : (this.tempdata = []);
            //   this.sliceVD();
              this.loader2 = false;
              this.isdatewise = false;
              
            }
          },
          (Err) => {
            this.dataFetchStatus='Error'
            this.loader2 = false;
          }
        );
    } else {
      this.Submit();
    }
    // this.dataread();


  }
  OnViolationSelect(){
    this.dataFetchStatus='init'
    // this.page=1
    // this.pageSize=30
    // // this.total=of(0)
    //  this.violData=of([])
    // !this.isdatewise ? (this.page = 1) : "";
    // this.selectedCameraId = this.selectedItems.data;
    if (this.isdatewise) {
      this.webServer
        .DatewiseRAViolations(
          this.fromDate,
          this.toDate,
          this.page,
          this.pageSize,
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null,
          this.selectedParkingType? this .selectedParkingType.data :null,
          this.selectedViolationType?this.selectedViolationType.data:null

        )
        .subscribe(
          (Rdata: any) => {
            if (Rdata) {
              this.dataFetchStatus = "success";

              this.isLatest = false;
              // table?.classList.remove("loading");
              this.vpmsData = Rdata.message
              if (!Rdata.success) {
                this.notification(Rdata.message);
                this.dataFetchStatus = "success";
                // this.imageData = Rdata.message;
            //   this.total = of(Rdata.message.length);
              // this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
              // Rdata.success
              //   ? (this.tempdata = Rdata.message)
              //   : (this.tempdata = []);
            //   this.sliceVD();
              this.loader2 = false;
              this.isdatewise = false;
              
            }
          },
          (Err) => {
            this.dataFetchStatus='Error'
            this.loader2 = false;
          }
        );
    } else {
      this.Submit();
    }
    // this.dataread();


  }

  ResetFilters() {
    this.selectedMoments = null;
    this.selectedDepartment = null;
    this.selectedCameraId = null;
    this.selectedParkingType = null;
    this.selectedViolationType = null;
    this.isdatewise = false;
    this.dataFetchStatus = "Loading";
    this.BackToToday();
  }

  BackToToday() {
    this.selectedMoments = null;
    this.selectedItems = null;
    this.selectedCameraId = null;
    this.selectedDepartment = null;
    this.selectedParkingType = null;
    this.selectedViolationType = null;
    this.selectedItems1 = null;
    this.page = 1;
    this.Images = [];
    this.latest = false;
    // this.tempdata = [];
    // this.total = of(0);

    var table = document.getElementById("dataTable");
    table?.classList.add("loading");
    this.loader2 = true;
    this.isdate = false;
    // this.tempdata = [];
    // this.total = of(0);
    this.webServer.LiveRAViolationData().subscribe(
      (Rdata: any) => {
        if (Rdata) {
          this.isLatest = false;
          table?.classList.remove("loading");
          // this.imageData = Rdata.message;
        //   this.total = of(Rdata.message.length);
          // this.tempdata = Rdata.message;
          this.violData = of(Rdata.message);
          if (!Rdata.success) {
            this.notification(Rdata.message);
            this.dataFetchStatus = "success";
          } else {
          }
          var cviol = Rdata.message;
          // Rdata.success
          //   ? (this.tempdata = Rdata.message)
          //   : (this.tempdata = []);
        //   this.sliceVD();
          this.loader2 = false;
          this.isdatewise = false;
          localStorage.setItem("updatedLen", JSON.stringify(cviol.length));
          var updatedLen = Number(localStorage.getItem("updatedLen"));
        }
      },
      (Err) => {
        this.loader2 = false;
      }
    );

    this.dataread();
  }
  //function to show the  notification through snackbars
  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : "", {
      duration: 4000,
      panelClass: ["error"],
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }

  //function  to manage  the pagination
//   sliceVD() {
//     if (!this.isdate) {
//       this.tempdata.forEach((element, index: number) => {
//         this.tempdata[index].data = element.data.map(
//           (element: any, index: number) => ({ ...element, id: index + 1 })
//         );
//       });
//       this.total = of(
//         this.tempdata.slice(
//           (this.page - 1) * this.pageSize,
//           (this.page - 1) * this.pageSize + this.pageSize
//         ).length
//       );
//       this.total = of(this.tempdata.length);
//       this.violData = of(
//         this.tempdata
//           .map((div: any) => ({ ...div }))
//           .slice(
//             (this.page - 1) * this.pageSize,
//             (this.page - 1) * this.pageSize + this.pageSize
//           )
//       );
//     }
//     if (this.isdate) {
//       var table = document.getElementById("dataTable");
//       table?.classList.add("loading");
//       this.webServer
//         .DatewiseRAViolations(
//           this.fromDate,
//           this.toDate,
//           this.page,
//           this.pageSize,
//           this.selectedDepartment ? this.selectedDepartment.data : null,
//           this.selectedCameraId ? this.selectedCameraId.data : null
//         )
//         .subscribe((Response: any) => {
//           this.dataFetchStatus = "success";
//           if (Response.success) {
//             table?.classList.remove("loading");
//             if (Response.message.length === 0) {
//               this.notification("No violations found");
//             }
//             this.tempdata = Response.message;
//             this.tempdata.forEach((element, index: number) => {
//               this.tempdata[index].data = element.data.map(
//                 (element: any, index: number) => ({ ...element, id: index + 1 })
//               );
//             });
//             //this.imageData=
//             this.violData = of(this.tempdata);
//           }
//         });
//     }
//   }

  trackByFn(index: number, item: any): number {
    return item.SNo; // Use a unique identifier for each item
  }

  //----------METHOD TO FETCH DATE WISE DATA-----------------

  

  //-----------------METHOD TO GO BACK TO LIVE-------------------------

  
  //----------FUNCTION TO TRANSFORM THE DATE----------------

  dateTransform(date: any) {
    const temp = new Date(date.year, date.month - 1, date.day);
    const FD = this.datepipe.transform(temp, "dd/MM/yyyy");

    return FD;
  }

 

  

  
 
  imageCarousal(viol: any) {
    this.Images = [];
    viol.imagename.forEach((imgname: string, index: number) => {
      this.Images[index] = {
        src: this.API + '/image/'+this.analyticsType+'/'  + imgname,
        thumb: this.API + '/image/'+this.analyticsType+'/'  + imgname,
        caption: imgname,
      };
    });

    this.open(0);
  }
  open(index: number): void {
    this._lightbox.open(this.Images, index);
  }
  close(): void {
    this._lightbox.close();
  }

  //fucntion to create and download the excel as per the given dates and other inputs
  async submitForm() {
    this.isalert = false;
    this.excelLoad = true;
    this.isExcel = false;
    // this.selectedCameraId = this.selectedItems ? this.selectedItems.data : null;
    // this.selectedDepartment = this.selectedItems1?this.selectedItems1.data:null;

    var body = {
      from_date: this.selectedMoments.startDate.format("YYYY-MM-DD HH:mm:ss"),
      to_date: this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss"),
      cameraname: this.selectedCameraId
        ? this.selectedCameraId.data == "all_cameras"
          ? null
          : this.selectedCameraId.data
        : null,
      department: this.selectedDepartment
        ? this.selectedDepartment.data == "all_departments"
          ? null
          : this.selectedDepartment.data
        : null,
    };
    this.webServer.CreateRAViolationExcel(body).subscribe(
      (Response: any) => {
        if (Response.success) {
          this.webServer.DownloadViolationExcel().subscribe(
            (response: HttpResponse<any>) => {
              var contentType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

              const blob = new Blob([response.body], { type: ".xlsx" });
              // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
              var fileName =
                "violation report" +
                " " +
                this.datepipe.transform(new Date(), "YYYY_MM_dd_h_mm_ss") +
                ".xlsx";
              const file = new File([blob], fileName, { type: ".xlsx" });
              saveAs(blob, fileName);
              this.excelLoad = false;
              this.isExcel = true;
            },
            (err) => {
              this.excelLoader = false;
            }
          );
        } else {
          this.notification(Response.message, "Retry");
          this.excelLoad = false;
          this.isExcel = false;
          this.alertmessage = Response.message;
          this.isalert = true;
        }
      },
      (err) => {
        this.excelLoad = false;

        this.isExcel = false;
        this.alertmessage = "Error while creating excel";
        this.notification(this.alertmessage, "Retry");
        this.isalert = true;
      }
    );
  }

  //-------METHOD TO DOWNLOAD THE EXCEL--------
  GetViolationLength(
    fromDate: any,
    toDate: any,
    cameraName: any,
    department: any
  ) {
    this.excelLoader = true;
    var length;
    this.webServer
      .DatewiseRAViolations(
        fromDate,
        toDate,
        null,
        null,
        department ? department : null,
        cameraName ? cameraName : null,
        this.selectedParkingType? this .selectedParkingType.data :null,
        this.selectedViolationType?this.selectedViolationType.data:null


      )
      .subscribe((Response: any) => {
        if (Response.success) {
          length = Response.message.length;
        }
      });
    return length;
  }

  //-----NAVIGATE TO SETTINGS PAGE------
//   settings() {
//     this.router.navigate(["app/Settings"]);
//   }

  //-----METHOD FOR ALERT SOUND------------
  alertSound() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/alert.mp3";
    audio.load();
    audio.play();
  }

  //----------METHOD TO TOGGLE THE VOLUME-------
  volumeToggle() {
    if (!this.alert) {
      this.audioOff = true;
      localStorage.setItem("audioOff", "true");
    } else {
      this.audioOff = !this.audioOff;
      localStorage.setItem("audioOff", this.audioOff ? "true" : "false");
    }
  }

  //----------METHOD TO TOGGLE THE NOTIFICATION --------
  alertToggle() {
    this.alert = !this.alert;
    localStorage.setItem("alert", this.alert ? "true" : "false");
    if (!this.alert) {
      this.audioOff = true;
      localStorage.setItem("alert", "false");

      localStorage.setItem("audioOff", "true");
    }
  }

  //function to get the latest data
  getLatestData() {
    this.loader2 = false;
    this.loaderLatest = true;
    this.latest = true;
    var table = document.getElementById("dataTable");
    table?.classList.add("loading");
    this.webServer
      .GetLatestRAData(  this.selectedCameraId ? this.selectedCameraId.data : null,
        this.selectedDepartment ? this.selectedDepartment.data : null)
      .subscribe(
        (Rdata: any) => {
          if (Rdata.success) {
            this.isLatest = true;
            table?.classList.remove("loading");
            this.loaderLatest = false;
            // this.imageData = Rdata.message;
            // this.tempdata = Rdata.message;
            // this.tempdata = Rdata.message;

            // this.total = of(Rdata.message.length);
            this.violData = of(Rdata.message);
            // this.sliceVD();
          } else {
            this.violData = of([]);
            // this.total = of(0);
            // this.tempdata = [];
            this.loaderLatest = false;
            table?.classList.remove("loading");
            this.notification(Rdata.message);
          }
        },
        (err) => {
          this.loaderLatest = false;
          table?.classList.remove("loading");

          this.notification("Error While fetching the data", "Retry");
        }
      );
  }

  //----------------METHOD TO DOWNLOAD THE  IMAGE-------------

  downloadImage(img: any) {
    const imgUrl = img;
    const requestOptions = {
      headers: new HttpHeaders({
        responseType: "blob",
        // observe:'body'
      }),
      withCredentials: true,
    };
    const imgName = imgUrl.substr(imgUrl.lastIndexOf("/") + 1);

    this.http.get(imgUrl, { responseType: "blob" }).subscribe(
      (d: any) => {
        saveAs(d, imgName);
      },
      (err: any) => {}
    );
  }

  //fucntion to get the list of all available cameras
  getCameraList() {
    var cameralist: any[] = [];
    var cameraIdList: any[] = [];

    // var body = {
    //   from_date: this.selectedMoments.startDate.format("YYYY-MM-DD HH:mm:ss"),
    //   to_date: this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss"),

    // };

    // this.fromDate = this.selectedMoments.startDate.format(
    //   "YYYY-MM-DD HH:mm:ss"
    // );
    console.log(this.fromDate, "this date is from the raviolations");
    // this.toDate = this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss");
    console.log(this.selectedMoments, "this is from the raviolations");

    cameralist[0] = { key: "0", label: "All Cameras", data: "all_cameras" };
    // console.log(this.selectedMoments.startDate)
    //     var date;
    // if(this.selectedMoments!==null){
    //   date = this.selectedMoments
    // }
    // else{
    //   date = null
    // }

    this.webServer
      .GetRACameraDetails(
        this.selectedMoments !== null
          ? this.selectedMoments.startDate.format("YYYY-MM-DD HH:mm:ss")
          : null,
        this.selectedMoments !== null
          ? this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss")
          : null
      )
      .subscribe((data: any) => {
        if (data.status === true) {
          data.msg.forEach((el: any, i: number) => {
            cameraIdList.push({ cameraid: i, cameraname: el }); 
          });
          cameraIdList = cameraIdList.filter((el, i, a) => i === a.indexOf(el));
          cameraIdList.forEach((element: any, i: number) => {
            // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
            var obj;
            obj = {
              key: (i + 1).toString(),
              label: element.cameraname,
              data: element.cameraname,
            };

            cameralist.push(obj);
          });

          this.dropdownList = of(cameralist);
        }
      });
  }

  getDepartmentList() {
    var departmentlist: any[] = [];
    var departmentIdList: any[] = [];

    departmentlist[0] = {
      key: "0",
      label: "All Departments",
      data: "all_departments",
    };

    this.webServer
      .GetRADepartmentDetails(
        this.selectedMoments !== null
          ? this.selectedMoments.startDate.format("YYYY-MM-DD HH:mm:ss")
          : null,
        this.selectedMoments !== null
          ? this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss")
          : null
      )
      .subscribe((data: any) => {
        if (data.success === true) {
          data.message.forEach((el: any, i: number) => {
            departmentIdList.push({ departmentid: i, department: el });
          });
          departmentIdList = departmentIdList.filter(
            (el, i, a) => i === a.indexOf(el)
          );
          departmentIdList.forEach((element: any, i: number) => {
            var obj;
            obj = {
              key: (i + 1).toString(),
              label: element.department,
              data: element.department,
            };

            departmentlist.push(obj);
          });

          this.dropdownList1 = of(departmentlist);
        }
      });
  }

  getParkingTypeList() {
    var parkingTypelist: any[] = [];
    var parkingTypeIdList: any[] = [];

    parkingTypelist[0] = { key: "0", label: "All Type Parking", data: "all_type_parking" };
    
      var parkingtypes = ['Only Parking','Only No-Parking']
          parkingtypes.forEach((el: any, i: number) => {
            parkingTypeIdList.push({ parkingtypeid: i, parkingtypename: el }); 
          });
          parkingTypeIdList = parkingTypeIdList.filter((el, i, a) => i === a.indexOf(el));
          parkingTypeIdList.forEach((element: any, i: number) => {
            
            var obj;
            obj = {
              key: (i + 1).toString(),
              label: element.parkingtypename,
              data: element.parkingtypename,
            };

            parkingTypelist.push(obj);
          });

          this.parkingTypeList = of(parkingTypelist);
    
  }


  getViolationList() {
    var violationlist: any[] = [];
    var violationIdList: any[] = [];

    // violationlist[0] = { key: "0", label: "All Type Parking", data: "all_type_parking" };
    
      var violation = ['Include Violation','Exclude Violation']
          violation.forEach((el: any, i: number) => {
            violationIdList.push({ violationid: i, violation: el }); 
          });
          violationIdList = violationIdList.filter((el, i, a) => i === a.indexOf(el));
          violationIdList.forEach((element: any, i: number) => {
            
            var obj;
            obj = {
              key: (i + 1).toString(),
              label: element.violation,
              data: element.violation,
            };

            violationlist.push(obj);
          });

          this.violationTypeList = of(violationlist);
    
  }

  //function to fetch the available violation types
  // getViolationTypes() {
  //   var violTypeList: any[] = [];
  //   var temp: any[] = [];

  //   this.violationsList[0] = {
  //     key: "0",
  //     label: "All Violations",
  //     data: "all_violations",
  //   };
  //   this.webServer.GetViolationList().subscribe((reponse: any) => {
  //     if (reponse.success) {
  //       reponse.message.forEach((element: any) => {
  //         temp.push(element);
  //       });

  //       temp.forEach((element: any, index: number) => {
  //         var obj;

  //         obj = {
  //           key: (index + 1).toString(),
  //           icon: "pi",
  //           label: element,
  //           data: element,
  //         };

  //         this.violationsList.push(obj);
  //       });
  //       this.violationTypeList = of(this.violationsList);
  //     }
  //   });
  // }

//   SelectViol(data: any, modal: any) {
//     this.editViol = data;
//     this.modalService.open(modal, { size: "xl", centered: true });
//   }

//   VerifyTrueViol(event: any, viol: any, Sno?: number) {
//     this.editViol = viol;
//     console.log(viol);
//     console.log(Sno);
//     this.webServer.VerifyViolation(this.editViol._id.$oid, true).subscribe(
//       (response: any) => {
//         this.webServer.notification(response.message);
//         if (response.success) {
//           this.modalService.dismissAll();
//           if (this.isdatewise) 
//           this.sliceVD();
//         }
//         if (!this.isdatewise) {
//           this.GetViolationData();
//         }
//       },
//       (Err: any) => {
//         this.webServer.notification("Error while the  Process", "Retry");
//       }
//     );
//   }

//   VerifyFalseViol(event: any, viol: any, Sno?: any) {
//     console.log(Sno);
//     this.editViol = viol;
//     this.webServer.VerifyViolation(this.editViol._id.$oid, false).subscribe(
//       (response: any) => {
//         this.webServer.notification(response.message);
//         if (response.success) {
//           this.modalService.dismissAll();
//           if (this.isdatewise) this.sliceVD();
//         }
//         if (!this.isdatewise) {
//           this.GetViolationData();
//         }
//       },
//       (Err: any) => {
//         this.webServer.notification("Error while the  Process", "Retry");
//       }
//     );
//   }

  //function to get the live  violation data
  GetViolationData() {
    var table = document.getElementById("content");
    table?.classList.add("loading");

    if (!this.latest || !this.isLatest) {
      this.webServer
        .LiveRAViolationData(
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null
        )
        .subscribe(
          (Rdata: any) => {
            if (Rdata.success) {
              table?.classList.remove("loading");

              var data = Rdata.message;

              // this.imageData = Rdata.message;
              // this.tempdata = Rdata.message;
              Number(
                localStorage.setItem(
                  "updatedLen",
                  Rdata.message.length ? Rdata.message.length : 0
                )
              );

              // this.tempdata = Rdata.message;
              // this.imageCarousal()

            //   this.total = of(this.tempdata.length);
              this.violData = of(Rdata.message);
            //   this.sliceVD();
            } else {
              table?.classList.remove("loading");
              this.notification(Rdata.message);
            }
          },
          (err) => {
            table?.classList.remove("loading");

            this.notification("Error While fetching the data");
          }
        );
    }
  }

  IsDeleteData(modal: any, violationData: any) {
    this.selectedViolation = violationData;
    this.modalService.open(modal, { centered: true });
  }
  DeleteViolationData() {
    this.webServer
      .DeleteViolationData(this.selectedViolation._id.$oid)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.modalService.dismissAll();

            this.webServer.notification(response.message);
            this.RefreshViolationData();
          } else {
            this.modalService.dismissAll();
            this.webServer.notification(response.message, "Retry");
          }
        },
        (Err) => {
          this.webServer.notification("Error while the process", "Retry");
        }
      );
  }

  StopLiveFeed() {
    clearInterval(this.interval);
  }
  StartLiveFeed() {
    this.dataread();
  }
  RefreshViolationData() {
    if (!this.isdatewise && !this.isLatest) {
      var table = document.getElementById("dataTable");
      table?.classList.add("loading");

      this.webServer
        .LiveRAViolationData(
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedDepartment ? this.selectedDepartment.data : null
        )
        .subscribe(
          (Response: any) => {
            if (!this.latest) {
              table.classList.remove("loading");
              if (Response.success === true) {
                // this.imageData = Response.message;
                // this.tempdata = Response.message;
                //  this.imageCarousal()
                // this.total = of(Response.message);

                this.violData = of(Response.message);

                // this.sliceVD();

                // if (this.tempdata.length > 0) {
                //   this.Excel = true;
                // } else {
                // }

                // this.sliceVD();
              } else {
              }
            }
          },
          (err: any) => {
            table.classList.remove("loading");
          }
        );
    } else if (this.isdatewise && !this.isLatest) {
      var table = document.getElementById("dataTable");
      table?.classList.add("loading");

      this.pageSize = 30;
      this.page = 1;
      this.webServer
        .DatewiseRAViolations(
          this.fromDate,
          this.toDate,
          null,
          null,
          this.selectedDepartment ? this.selectedDepartment.data : null,
          this.selectedCameraId ? this.selectedCameraId.data : null,
          this.selectedParkingType? this .selectedParkingType.data :null,
          this.selectedViolationType?this.selectedViolationType.data:null


        )
        .subscribe(
          (Response: any) => {
            if (Response.success) {
              if (Response.message.length == 0) {
                2;
                // this.tempdata = [];
                this.violData = of([]);

                // this.total = of(0);
                table?.classList.remove("loading");
                this.notification(
                  "No violations found for entered date and time"
                );
              }
              if (Response.message.length > 0) {
                // this.imageData = Response.message;
                // this.total = of(Response.message.length);
                this.webServer
                  .DatewiseRAViolations(
                    this.fromDate,
                    this.toDate,
                    this.page,
                    this.pageSize,
                    this.selectedDepartment
                      ? this.selectedDepartment.data
                      : null,
                    this.selectedCameraId ? this.selectedCameraId.data : null,
                    this.selectedParkingType? this .selectedParkingType.data :null,
                    this.selectedViolationType?this.selectedViolationType.data:null


                  )
                  .subscribe(
                    (Response: any) => {
                      if (Response.success) {
                        table?.classList.remove("loading");
                        if (Response.message.length === 0) {
                          this.dataFetchStatus = "success";

                          this.notification("No violations found");
                          this.violData = of([]);
                        } else {
                          this.dataFetchStatus = "success";

                          // this.tempdata = Response.message;
                          this.violData = of(Response.message);
                        //   this.sliceVD();
                        }
                      }
                    },
                    (err) => {
                      this.dataFetchStatus = "Error";
                      this.notification("Error while fetching the data");
                    }
                  );
              }
            } else {
              // this.tempdata = [];
              this.violData = of([]);

            //   this.total = of(0);
              this.dataFetchStatus = "success";

              table?.classList.remove("loading");
              table?.classList.remove("loading");
              this.notification("No violations found");
            }
          },
          (err) => {}
        );
    } else if (this.isLatest || this.latest) {
      this.getLatestData();
    }
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
    clearInterval(this.interval);

    this.isalert = false;
  }

//   onChangeDetection(event: any) {}

  
  
 

}
