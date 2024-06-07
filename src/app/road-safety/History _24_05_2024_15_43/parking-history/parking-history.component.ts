import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Query,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ServerService } from "src/app/Services/server.service";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of, startWith, Subscription, switchMap } from "rxjs";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";
import {
  ModalDismissReasons,
  NgbDate,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from "file-saver";
0;
import { MatSnackBar } from "@angular/material/snack-bar";
import { Moment } from "moment";
import { DaterangepickerDirective } from "ngx-daterangepicker-material";
import dayjs from "dayjs/esm";
import { DateFormaterPipe } from "src/app/common/date-formater.pipe";
import { ParkingHistoryService } from "./parking-history.service";

@Component({
  selector: 'app-parking-history',
  templateUrl: './parking-history.component.html',
  styleUrls: ['./parking-history.component.css']
})

export class ParkingHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  isalert: boolean = false;
  imageUrl: string;
  prevLiveCount: number = 0;
  helmetFilterValue: FormControl<Number> = new FormControl<Number>(30, [
    Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
    Validators.min(30),
  ]);
  vestFilterValue: FormControl<Number> = new FormControl<Number>(30, [
    Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
    Validators.min(30),
  ]);
  tempdata: any[] = [];
  page: number = 1;
  pageSize: number = 30;
  collectionSize: number;
  cameraDetails: any[] = [];
  alertmessage: string = "";
  total: Observable<number> = of(0);
  violData: Observable<any[]> = of([]);
  loading: boolean = false;
  filterOut: FormControl = new FormControl();
  excelLoader: boolean = false;
  currentViol!: any;
  show1: number = 30;
  show2: number = 40;
  show3: number = 50;
  dataFetchStatus: string = "init";
  fromDate: any = new Date();
  toDate: any = new Date();
  isdatewise: boolean = false;
  API: any;
  interval: any;
  loader2: boolean = false;
  Excel: boolean = false;
  Edata: any[] = [];
  isExcel: boolean = false;
  excelLoad: boolean = false;
  alert: boolean = true;
  imageData: any[] = [];
  ExcelRange: number;
  time: any;
  delay: number;
  objectKeys = Object.keys;
  isdate: boolean = false;
  analyticsType:string='PPE'
  selectedViolType: string | null = null;
  Subsciption!: Subscription;
  selectedCameraId: any | null = null;
  selectedDepartment: any | null = null;
  dropdownList: Observable<any[]> = of([]);
  dropdownList1: Observable<any[]> = of([]);
 
  Images: any[] = [];
  @ViewChild("dangerAlert") Violation: ElementRef<any>;
  dropdownSettings!: IDropdownSettings;
  selectedItems!: any;
  selectedItems1!: any;
  violationTypeList: Observable<any[]> = of([
    { key: "0", label: "All Violations", icon: "pi", data: "all_violations" },
  ]);
  dropdownSettings2: any;
  selectedViolation!: any;
  loaderLatest: boolean = false;
  isLatest: boolean = false;
  latest: boolean = false;

  isEditTable: boolean = true;
  violationsList: any[] = [];
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
  @ViewChildren(DaterangepickerDirective) pickerDirective: any;
  editViol: any;

  constructor(
    private http: HttpClient,
    private webServer: ParkingHistoryService,
    // private webServer: ServerService,
    private datepipe: DatePipe,
    private toasterService: ToastrService,
    private _lightbox: Lightbox,
    private _lightBoxConfig: LightboxConfig,
    private router: Router,
    private snackbar: MatSnackBar,
    public modalService: NgbModal,
    public Router: Router
  ) {
   
    this.delay = this.webServer.logInterval;

    this.getCameraList();
    this.getDepartmentList();
    this.ExcelRange = 0;
    this._lightBoxConfig.showDownloadButton = false;
    this._lightBoxConfig.showZoom = true;
    this._lightBoxConfig.showImageNumberLabel = true;
    this._lightBoxConfig.fitImageInViewPort = true;
    this._lightBoxConfig.disableScrolling = false;
    this._lightBoxConfig.centerVertically = false;
    //..............................................

    this.API = webServer.IP;

 this.dataFetchStatus='init'
   
    if (!this.latest || this.isLatest) {
      this.webServer.LivePPEViolationData().subscribe(
        
(Rdata: any) => {
          this.dataFetchStatus='success'
          if (Rdata.success) {
            this.prevLiveCount = Rdata.now_live_count;
            this.imageData = Rdata.message;
            this.tempdata = Rdata.message;
           
            this.tempdata = Rdata.message;
            this.total = of(this.tempdata.length);
            this.violData = of(Rdata.message);
            this.sliceVD();
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

    //..............................................
  }

  ngOnInit(): void {
    this.helmetFilterValue.valueChanges.subscribe((value: any) => {
      console.log(this.helmetFilterValue);
    });
 
    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

    this.dropdownSettings2 = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: "No violation types detected",
      maxHeight: 197,
    };

    //...........Reading previous violation data's length from local storage....

    this.GetPPEFilterValues();

    
    
  }

  Reset() {
    this.selectedMoments = null;
    this.selectedCameraId = null;
    this.selectedDepartment = null;
    this.BackToToday();
  }

  ngAfterViewInit() {
    this.dataread();
  }

  openDatePicker(event: any) {
    var dateInput = document.getElementById("dateInput");
    dateInput.click();
  }

  dataread() {
    this.interval = setInterval(() => {
      if (!this.isdate) {
      
        this.Subsciption = this.webServer
          .LivePPEViolationData( this.selectedCameraId ? this.selectedCameraId.data : null,
            this.selectedDepartment ? this.selectedDepartment.data : null)
          .subscribe(
            (Rdata: any) => {
              if (Rdata.success) {
                var response = { ...Rdata };
                var cviol = [...Rdata.message];
                 this.loader2=false
                if ((response.now_live_count - this.prevLiveCount) > 0) {
                  this.tempdata = cviol;
                  this.sliceVD();
                  this.prevLiveCount = response.now_live_count;
                }
              }
              
            },
            (Err) => {
              this.dataFetchStatus = "Error";
            }
          );
      } else {
        this.violData = of([]);
        this.dataFetchStatus = "success";
      }
    }, this.delay);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //function for searching


  //function  to manage  the pagination
  sliceVD() {
    if (!this.isdate) {
      this.total = of(
        this.tempdata.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        ).length
      );
      this.total = of(this.tempdata.length);
      this.violData = of(
        this.tempdata
          .map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div }))
          .slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          )
      );
    }
    if (this.isdate) {
      var table = document.getElementById("dataTable");
      table?.classList.add("loading");
      this.webServer
        .DatewisePPEViolations(
          this.fromDate,
          this.toDate,
          this.page,
          this.pageSize,
          this.selectedDepartment ? this.selectedDepartment.data : null,
          this.selectedCameraId ? this.selectedCameraId.data : null,

          // this.selectedViolType ? this.selectedViolType : null,
        )
        .subscribe((Response: any) => {
          if (Response.success) {
            table?.classList.remove("loading");
            if (Response.message.length === 0) {
              this.dataFetchStatus = "success";
              this.notification("No violations found");
            }
            this.tempdata = Response.message;
            //this.imageData=
            this.violData = of(this.tempdata);
          }
        });
    }
  }

  //----------METHOD TO FETCH DATE WISE DATA-----------------

  Submit() {
    clearInterval(this.interval);
    this.dataFetchStatus = "init";
    this.isLatest = false;
  
    this.Images = [];
    this.fromDate = this.selectedMoments.startDate.format(
      "YYYY-MM-DD HH:mm:ss"
    );
    this.toDate = this.selectedMoments.endDate.format("YYYY-MM-DD HH:mm:ss");
    this.getCameraList();
    this.getDepartmentList();
    this.Subsciption ? this.Subsciption.unsubscribe() : "";
   this.violData=of([])
   this.total=of(0)

    this.pageSize = 30;
    this.page = 1;
    this.isdate = true;
    this.loading = true;
    this.webServer
      .DatewisePPEViolations(
        this.fromDate,
        this.toDate,
        null,
        null,
        this.selectedDepartment ? this.selectedDepartment : null,
        this.selectedCameraId ? this.selectedCameraId : null
      )
      .subscribe(
        (Response: any) => {
          if (Response.success) {
            if (Response.message.length == 0) {
              this.tempdata = [];
              this.violData = of([]);
              this.loading = false;
              this.isdatewise = true;
              this.total = of(0);
              this.notification(
                "No violations found for entered date and time"
              );
            }
            if (Response.message.length > 0) {
              this.imageData = Response.message;
              this.total = of(Response.message.length);
              this.webServer
                .DatewisePPEViolations(
                  this.fromDate,
                  this.toDate,
                  this.page,
                  this.pageSize,
                  this.selectedDepartment ? this.selectedDepartment : null,
                  this.selectedCameraId ? this.selectedCameraId : null
                  // this.selectedViolType ? this.selectedViolType : null
                )
                .subscribe(
                  (Response: any) => {
                    if (Response.success) {
                      this.loading = false;
                      if (Response.message.length === 0) {
                        this.dataFetchStatus = "success";
                        this.notification("No violations found");
                        this.violData = of([]);
                        this.isdatewise = true;
                        this.loading = false;
                        this.dataFetchStatus = "success";

                      } else {
                        this.tempdata = Response.message;
                        this.isdatewise = true;
                        this.violData = of(this.tempdata);
                        this.sliceVD();

                        this.loading = false;
                        this.dataFetchStatus = "success";

                      }
                    }
                    else {
                      this.loading = false;
                      this.violData = of([]);
                      this.total=of(0)
                      this.dataFetchStatus = "success";
                      this.notification(Response.message);
                    }
                    this.loading = false;
                  },
                  (err) => {
                    this.dataFetchStatus = "Error";
                  
                    this.loading = false;
                    this.notification("Error while fetching the data");
                  }
                );
            }
          } else {
            this.tempdata = [];
            this.violData = of([]);
            this.loading = false;
            this.isdatewise = true;
            this.total = of(0);
           
            this.dataFetchStatus = "success";
            this.notification("No violations found");
            this.loading = false;
          }
        },
        (err) => {
          this.dataFetchStatus = "Error";
          this.loading = false;
        }
      );
  }

  // fetching the violation  details by  ppe violation percentage

  SetPPEFilters() {
     this.dataFetchStatus = "init";
     this.tempdata = [];
     this.total = of(0);
     this.violData = of([]);
    this.webServer
      .ChangePPEFiltersData({
        ppepercentage: {
          helmet: this.helmetFilterValue.value,
          vest: this.vestFilterValue.value,
        },
      })
      .subscribe((response: any) => {
        this.dataFetchStatus = "success";
        this.GetPPEFilterValues();
        if (!this.isdatewise) {
         
          
          this.webServer.LivePPEViolationData().subscribe(
            (Rdata: any) => {
              if (Rdata.success) {


                this.imageData = Rdata.message;
                this.tempdata = Rdata.message;
                Number(
                  localStorage.setItem(
                    "updatedLen",
                    Rdata.message.length ? Rdata.message.length : 0
                  )
                );
                this.tempdata = Rdata.message;
                this.total = of(this.tempdata.length);
                this.violData = of(Rdata.message);
                // console.log(this.violData)
                this.sliceVD();
              } else {
                this.notification(Rdata.message);
                this.dataFetchStatus = "success";
              }
            },
            (err) => {
              this.dataFetchStatus = "Error";

              this.notification("Error While fetching the data");
            }
          );
        } else {
          this.Submit();
        }
      });
  }

  GetPPEFilterValues() {
    this.webServer.GetPPEFiltersData().subscribe(
      (response: any) => {
        if (response.success) {
          this.vestFilterValue.setValue(response.message.vest);
          this.helmetFilterValue.setValue(response.message.helmet);
        } else {
        }
      },
      (Err) => {}
    );
  }

  //-----------------METHOD TO GO BACK TO LIVE-------------------------

  BackToToday() {
    // this.dataFetchStatus = "init";
    this.selectedMoments = null;
    this.selectedItems = null;
    this.selectedItems1 = null;
    this.page = 1;

    this.Images = [];
    this.latest = false;
    var table = document.getElementById("dataTable");
    table?.classList.add("loading");
    this.loader2 = true;
    this.isdate = false;
    this.tempdata = [];
    this.total = of(0);

    this.isdate = false;
    this.tempdata = [];
    this.total = of(0);
    this.webServer.LivePPEViolationData().subscribe(
      (Rdata: any) => {
        this.loader2 = false;
        this.dataFetchStatus = "success";
        if (Rdata) {
          this.isLatest = false;
          table?.classList.remove("loading");
          this.imageData = Rdata.message;
          this.total = of(Rdata.message.length);
          if (!Rdata.success) {
            this.notification(Rdata.message);
            this.dataFetchStatus = "success";
          }
          var cviol = Rdata.message;
          Rdata.success
            ? (this.tempdata = Rdata.message)
            : (this.tempdata = []);
          this.sliceVD();
          this.isdatewise = false;
          localStorage.setItem("updatedLen", JSON.stringify(cviol.length));
          var updatedLen = Number(localStorage.getItem("updatedLen"));
        }
      },
      (Err) => {
        this.dataFetchStatus = "Error";
      }
    );

    this.dataread();
  }
  //----------FUNCTION TO TRANSFORM THE DATE----------------

  dateTransform(date: any) {
    const temp = new Date(date.year, date.month - 1, date.day);
    const FD = this.datepipe.transform(temp, "dd/MM/yyyy");

    return FD;
  }

  onCameraIdSelect(event: any) {
    this.dataFetchStatus='init'
    this.page=1
    this.pageSize=30
    this.total=of(0)
     this.violData=of([])
    !this.isdatewise ? (this.page = 1) : "";
    // this.selectedCameraId = this.selectedItems.data;
    if (!this.isdatewise) {
      this.webServer
        .LivePPEViolationData(
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
                this.imageData = Rdata.message;
              this.total = of(Rdata.message.length);
              this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
              Rdata.success
                ? (this.tempdata = Rdata.message)
                : (this.tempdata = []);
              this.sliceVD();
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
  }
  onDepartmentIdSelect(event: any) {
    this.dataFetchStatus='init'
    this.page=1
    this.pageSize=30
    this.total=of(0)
     this.violData=of([])
    // this.selectedCameraId = this.selectedItems.data;
    if (!this.isdate) {
      this.webServer
        .LivePPEViolationData(
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
                this.imageData = Rdata.message;
              this.total = of(Rdata.message.length);
              this.tempdata = Rdata.message;
              this.violData = of(Rdata.message);
              } else {
              }
              var cviol = Rdata.message;
              Rdata.success
                ? (this.tempdata = Rdata.message)
                : (this.tempdata = []);
              this.sliceVD();
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
  }

  imageCarousal(viol: any) {
    //  NgImageSliderServi
    this.Images = [];
    viol.imagename.forEach((imgname: string, index: number) => {
      console.log(imgname);
      this.Images[index] = {
        src: this.API + "/image/" +this.analyticsType+'/'+ imgname,
        thumb: this.API + "/image/" +this.analyticsType+'/'+ imgname,
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
    this.selectedDepartment = this.selectedItems1
      ? this.selectedItems1.data
      : null;

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

   

    this.webServer.CreatePPEViolationExcel(body).subscribe(
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
              this.excelLoad = false;

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
    violationType?: any,
    department?: any
  ) {
    this.excelLoader = true;
    var length;
    this.webServer
      .DatewisePPEViolations(
        fromDate,
        toDate,
        null,
        null,
        department ? department : null,
        cameraName ? cameraName : null
        // violationType ? violationType : null
      )
      .subscribe((Response: any) => {
        if (Response.success) {
          length = Response.message.length;
        }
      });
    return length;
  }

  //-----NAVIGATE TO SETTINGS PAGE------
  settings() {
    this.router.navigate(["app/Settings"]);
  }


  RefreshViolations(){
    this.total=of(0)
    this.page=1
    this.violData=of([])
    this.isdatewise=false
    this.isdate=false
    this.isLatest=false
    this.latest=false
    this.dataFetchStatus='init'

      this.webServer.LivePPEViolationData().subscribe(
        (Rdata: any) => {
          this.dataFetchStatus = "success";

          if (Rdata.success) {
            this.tempdata = Rdata.message;
            this.total = of(this.tempdata.length);
            this.violData = of(Rdata.message);
            this.sliceVD();
            this.prevLiveCount = Rdata.now_live_count;
            this.imageData = Rdata.message;
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


  //function to get the latest data
  GetLatestPPEData() {
    this.loader2 = false;
    this.loaderLatest = true;
    this.latest = true;
    // this.interval2.subscribe()
    var table = document.getElementById("dataTable");
    table?.classList.add("loading");
    console.log(this.selectedViolType);
    this.webServer.GetLatestPPEData(this.selectedCameraId).subscribe(
      (Rdata: any) => {
        if (Rdata.success) {
            
         
          this.isLatest = true;
          table?.classList.remove("loading");
          this.loaderLatest = false;
          Rdata.message.length === 0
            ? this.notification("No violations found")
            : (this.dataFetchStatus = "success");

          this.imageData = Rdata.message;
          this.tempdata = Rdata.message;
          console.log(this.tempdata);

          this.tempdata = Rdata.message;

          this.total = of(Rdata.message.length);
          this.violData = of(Rdata.message);
          this.sliceVD();
        } else {
          this.loaderLatest = false;
          table?.classList.remove("loading");
          this.notification("Error while fetching the data", "Retry");
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
    console.log(imgUrl);
    const imgName = imgUrl.substr(imgUrl.lastIndexOf("/") + 1);

    this.http.get(imgUrl, { responseType: "blob" }).subscribe(
      (d: any) => {
        console.log("image url data", d);
        saveAs(d, imgName);
      },
      (err: any) => {
        console.log("error", err);
      }
    );
  }

  //fucntion to get the list of all available cameras
  getCameraList() {
    var cameralist: any[] = [];
    var cameraIdList: any[] = [];

    cameralist[0] = { key: "0", label: "All Cameras", data: "all_cameras" };
    this.webServer
      .GetPPECameraDetails(
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
      .GetPPEDepartmentDetails(
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
            // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
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

  SelectViol(data: any, modal: any) {
    this.editViol = data;
    this.modalService.open(modal, { size: "xl", centered: true });
  }

  VerifyTrueViol(event: any, viol: any) {
    this.editViol = viol;
    this.webServer.VerifyViolation(this.editViol._id.$oid, true).subscribe(
      (response: any) => {
        this.webServer.notification(response.message);
        if (response.success) {
          this.modalService.dismissAll();
          if (this.isdatewise) this.Submit();
        }
        if (!this.isdatewise) {
          this.GetViolationData();
        }
      },
      (Err: any) => {
        this.webServer.notification("Error while the  Process", "Retry");
      }
    );
  }

  VerifyFalseViol(event: any, viol: any) {
    this.editViol = viol;
    this.webServer.VerifyViolation(this.editViol._id.$oid, false).subscribe(
      (response: any) => {
        this.webServer.notification(response.message);
        if (response.success) {
          this.modalService.dismissAll();
          if (this.isdatewise) this.Submit();
        }
        if (!this.isdatewise) {
          this.GetViolationData();
        }
      },
      (Err: any) => {
        this.webServer.notification("Error while the  Process", "Retry");
      }
    );
  }
  IsDeleteData(modal: any, violationData: any) {
    this.selectedViolation = violationData;
    this.modalService.open(modal);
  }
  DeleteViolationData() {
    this.webServer
      .DeleteViolationData(this.selectedViolation._id.$oid)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.modalService.dismissAll();
            this.RefreshViolationData();
            this.webServer.notification(response.message);
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
  RefreshViolationData() {
    this.total=of(0)
    this.page=1
    this.violData=of([])

    this.dataFetchStatus='init'
    if (!this.isdatewise && !this.isLatest) {
  

      this.webServer.LivePPEViolationData().subscribe(
        (Response: any) => {
            
         
          this.dataFetchStatus='success'
          if (!this.latest) {
            if (Response.success === true) {
              this.imageData = Response.message;
              this.tempdata = Response.message;
              //  this.imageCarousal()
              this.total = of(Response.message.length);

              this.violData = of(Response.message);

              data = Response.message;
              this.sliceVD();
              var data = Response.message;
              // this.tempdata = this.violdata

              if (this.tempdata.length > 0) {
                this.Excel = true;
              } else {
              }

              this.sliceVD();
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
        .DatewisePPEViolations(
          this.fromDate,
          this.toDate,
          null,
          null,
          this.selectedDepartment ? this.selectedDepartment.data: null,
          this.selectedCameraId ? this.selectedCameraId.data : null
          // this.selectedViolType ? this.selectedViolType : null
        )
        .subscribe(
          (Response: any) => {
            this.dataFetchStatus = "success";
            if (Response.success) {
              if (Response.message.length == 0) {
                this.tempdata = [];
                this.violData = of([]);

                this.total = of(0);
                table?.classList.remove("loading");
                this.notification(
                  "No violations found for entered date and time"
                );
              }
              if (Response.message.length > 0) {
                this.imageData = Response.message;
                this.total = of(Response.message.length);
                this.webServer
                  .DatewisePPEViolations(
                    this.fromDate,
                    this.toDate,
                    this.page,
                    this.pageSize,
                    this.selectedDepartment ? this.selectedDepartment : null,
                    this.selectedCameraId ? this.selectedCameraId : null
                    // this.selectedViolType ? this.selectedViolType : null
                  )
                  .subscribe(
                    (Response: any) => {
                      if (Response.success) {
                        table?.classList.remove("loading");
                        // console.log(Response.message)
                        if (Response.message.length === 0) {
                          this.notification("No violations found");
                          this.dataFetchStatus = "success";
                          this.violData = of([]);
                        } else {
                          this.tempdata = Response.message;
                          //this.imageCarousal()
                          // console.log(this.tempdata)

                          this.violData = of(this.tempdata);
                          this.sliceVD();
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
              this.tempdata = [];
              this.violData = of([]);

              this.total = of(0);
              table?.classList.remove("loading");
              table?.classList.remove("loading");
              this.notification("No violations found");
              this.dataFetchStatus = "success";
            }
          },
          (err) => {}
        );
    } else if (this.isLatest || this.latest) {
      this.GetLatestPPEData();
    }
  }

  //function to get the live  violation data
  GetViolationData() {
    var table = document.getElementById("content");
    table?.classList.add("loading");

    if (!this.latest || this.isLatest) {
      this.webServer.LivePPEViolationData().subscribe(
        (Rdata: any) => {
          if (Rdata.success) {
            table?.classList.remove("loading");

            var data = Rdata.message;

            this.imageData = Rdata.message;
            this.tempdata = Rdata.message;
            Number(
              localStorage.setItem(
                "updatedLen",
                Rdata.message.length ? Rdata.message.length : 0
              )
            );

            this.tempdata = Rdata.message;
            // this.imageCarousal()

            this.total = of(this.tempdata.length);
            this.violData = of(Rdata.message);
            this.sliceVD();
          } else {
            table?.classList.remove("loading");
            this.notification(Rdata.message);
            this.dataFetchStatus = "success";
          }
        },
        (err) => {
          table?.classList.remove("loading");

          this.notification("Error While fetching the data");
        }
      );
    }
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
    clearInterval(this.interval);

    this.isalert = false;

  }

}
