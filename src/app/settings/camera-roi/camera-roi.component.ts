import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of} from "rxjs";
import "fabric";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { configService } from "src/app/Services/config.service";
import { CameraRoiService } from "./camera-roi.service";



declare const fabric: any;
export interface polygonPoints {
  x: number;
  y: number;
}

export interface ROI {
  roi_name_canvas?: any;
  roi_data?: any;
  roi_id?: string;
  roi_name?: string;
  class_id?: any[];
  roi_canvas?: any;
  alarm_type?: any;
}

@Component({
  selector: "app-camera-roi",
  templateUrl: "./camera-roi.component.html",
  styleUrls: ["./camera-roi.component.css"],
})

export class CameraRoiComponent implements OnInit, AfterViewInit, OnDestroy {

/* ---------------------------------------------Global Variables-------------------------------------------*/

  isCameraData: boolean = false;
  cameraData: any[] = [];
  getObjectKeys=Object.keys
  isEdit: boolean = false;
  isChanges: boolean = false;
  newROIPoints: polygonPoints[] = [];
  ID: string;
  IP: string;
  canvas: any;
  imageName: string;
  CameraDataObservable: Observable<any> = of({});
  isEditText: boolean = false;
  selectedId: number;
  selectedEditId: number;
  deleteID: number;
  newPt: any;
  newROI: any;
  responseMessage: any;
  classIDPerson: FormControl = new FormControl("person", Validators.required);
  classIDCar: FormControl = new FormControl(0, Validators.required);
  classIDBike: FormControl = new FormControl(0, Validators.required);
  isPolygonDrawn: boolean = false;
  

  AISolutions: any;
  isWater: boolean = false;
  WaterROIData: any[] = [];
  selectedRoi: any;
  deleteField: any = "";
  isMouseDown: boolean = false;
  btnIndex: number;
  line: any;
  activeObj: any;
  deltaX: any; 
  deltaY: any;
  triangle: any;
  roiType: any = 0;
  currentArea: any;
  currentPlant: any;
  isSensgiz = false;
  tempROIID: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
  ratio: number = 1;
  polygonOptions: any = {
    fill: "rgba(0,0, 0,0)",
    strokeWidth: 3,
    stroke: "rgb(127, 255, 0)",
    scaleX: 1,
    scaleY: 1,
    objectCaching: false,
    selectable: false,
    transparentCorners: false,
    cornerColor: "blue",
  };
  classIds: any[] = ["person"];
  @ViewChild("canvasContainer", { static: true }) canvasContainer: ElementRef;
  isFail: boolean = false;
  isSuccess: boolean = false;
  SensGizInfo: any[] = [];
  sensgizModal: any;
  


  /*----------------------------------------Danger Zone (RA) Variables-------------------------------------*/
  RAPoints: any[] = [];
  isAddRAROI: boolean = false;
  allCameraData: ROI[] = [];
  RAROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
  raObjects: any[] = [];
  RAKeyId: number = 0;
  raROIColor: string = "rgb(255, 255, 0)";
  @ViewChild("RAROINameChangeModal", { static: false }) RAROINameChangeModal: TemplateRef<any>;
  @ViewChild("RAROINameModal", { static: false }) RAROINameModal: TemplateRef<any>;


  /*----------------------------------------Crowd Count (CC) Variables-------------------------------------*/
  selectedCCMode: any;
  // @ViewChild("CCType", { static: false }) CCTYpe: TemplateRef<any>;
  CCTypeList: Observable<any[]> = of([
    { label: "+ Crowd Count ROI", data: 0 },
    { label: "+ Crowd Count Full Frame", data: 1 },
  ]);
  isAddCCROI: boolean = false;
  @ViewChild("CCROINameModal") CCROINameModal: ElementRef<any>;
  CCROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
  CCObjectsMinMax: any[] = [
    new FormGroup({
      object: new FormControl("person"),
      person: new FormControl(true, Validators.requiredTrue),
      min: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
      max: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
    }),
  ];
  CCValid: number = 0;
  @ViewChild("CCFullFrameModal", { static: false }) CCFullFrameModal: TemplateRef<any>;
  CrowdForm: FormGroup = new FormGroup({
    min: new FormControl(null, [
      Validators.pattern(/^[^-a-zA-Z]+$/),
      Validators.required,
    ]),
    max: new FormControl(null, [
      Validators.pattern(/\d+/),
      Validators.required,
    ]),
  });




  CCData: any[] = [];
  CCpoints: any[] = [];
  CCKeyId: number = 0;
  CCObjectCounts: any[] = [];
  // @ViewChild("CCNameChangeModal") CCNameChangeModal: ElementRef<any>;
  peopleCrowdForm: FormGroup = new FormGroup({
    min: new FormControl(null, Validators.pattern("^(?!-)d+$")),
    max: new FormControl(null, Validators.pattern(/\d+/)),
  });
  vehicleCrowdForm: FormGroup = new FormGroup({
    min: new FormControl(null, Validators.pattern(/\d+/)),
    max: new FormControl(null, Validators.pattern(/\d+/)),
  });
  crowdConfig: any[] = [];
 



  /*--------------------------------------Traffic Count (TC) Variables-------------------------------------*/
  TCDirection: FormControl = new FormControl(null, Validators.required);
  TCData: any[] = [];
  trafficCountLineROIS: any[] = [];
  trafficCountData: any[] = [];
  tempTCData: any[] = [];
  tempTCLineROIS: any[] = [];
  TCCanvasData: any[] = [];
  // TCLineList: any[] = [];
  tempTCCanvas: any[] = [];
  TCKeyId: number = 0;
  tcName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
  TrafficConfig: any;
  isTCRoi: any;
  @ViewChild("TCNameModal", { static: false }) TCNameModal: TemplateRef<any>;
 
 
 

/*--------------------------------Personal Protective Equipment (PPE) Variables----------------------------*/
PPEForm: FormGroup = new FormGroup({
  helmet: new FormControl("helmet"), 
  vest: new FormControl("person"),
});
PPEConfig: any = { helmet: false, vest: false };
ppeAlarmObjects: any[] = ["helmet", "vest"];



  /*------------------------------------------Spillage Variables------------------------------------------*/

  isAddSpillageROI: boolean = false;
  @ViewChild("spillageROINameModal") spillageROINameModal: ElementRef<any>;

  spillageROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
  spillageData: any[] = [];
  spillageROIPoints: any[] = [];
  spillageRoiCount: number = 0;
  spillageStroke: string = "#f44336";
  


  /*----------------------------------------Fire Smoke Dust Variables--------------------------------------*/

  fireSmokeDustForm: FormGroup = new FormGroup({
    fire: new FormControl(false, Validators.requiredTrue),
    smoke: new FormControl(false, Validators.requiredTrue),
    water: new FormControl(false, Validators.requiredTrue),
    dust: new FormControl(false, Validators.requiredTrue),
  });
  cameraType: FormControl = new FormControl(null);
  sensgiz: any = new FormArray([
    new FormGroup({
      coinLocation: new FormControl("", [Validators.required]),
      presetId: new FormControl(null, [
        Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
      ]),
    }),
  ]);

  // @ViewChild("FireNameModal", { static: false })fireROINameModal: ElementRef<any>;


  /*-------------------------------------------Parking Variables--------------------------------------------*/
  isAddParkingROI:boolean = false;
  @ViewChild("ParkingROINameModal", { static: false }) ParkingROINameModal: TemplateRef<any>;
  @ViewChild("SelectionModal", { static: false }) SelectionModal: TemplateRef<any>;

  parkingROIPoints:any[] = [];
  parkingObjects:any[] = [];
  parkingKeyId: number = 0;
  isOtherObjectsViolation:string = ''
  isOtherTimeViolation:string = ''
  vehicles_List:any[] = [
    'Bicycle',
    'Car',
    'Motorcycle',
    'Bus',
    'Truck',
  ]
  
   
    parkingROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
    selectedObjects: any[] = [];

    isSetTime:string=''
  selectedTime: any = null
  parkingData:any[] =[]; 
  @ViewChild("ParkingROINameChangeModal", { static: false }) ParkingROIChangeModal: TemplateRef<any>;


    //--------------------NO-Parking Varaibles-----------------

    isNo_Parking :boolean= false;
    no_parkingROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
    parkingROIColor: string ="#FF7308"
   

  /*-----------------------------------------Traffic-Jam Variables-------------------------------------------*/
    isAddTraffic_jamROI:boolean = false;
    traffic_jamROIPoints:any[] = [];
    traffic_jamObjects:any[] = [];
    traffic_jamKeyId: number = 0;
    traffic_jamROIName: FormControl = new FormControl("", [Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
    traffic_jamPercentage: number = 20;
    traffic_jamData:any[] =[];
    minimumTime = { hour:0, minute: 1 };
    @ViewChild("Traffic_JamROINameModal",{static:false}) Traffic_JamROINameModal:TemplateRef<any>;
    traffic_jamROIColor:string="#be29ec"
    @ViewChild("Traffic_JamROINameChangeModal", { static: false }) Traffic_JamROIChangeModal: TemplateRef<any>;


 
   /*----------------------------------------Alarm Variables-----------------------------------------------*/
 
  isHooter = false;
  isRelay = false;
  isAlertFormValid: boolean = false;
  channels: Observable<any[]> = of([
    { data: 1, label: "channel 1", key: 0 },
    { data: 2, label: "channel 2", key: 1 },
    { data:3, label: "channel 3", key: 2},
    { data:4, label: "channel 4", key: 3 },
    { data:5, label: "channel 5", key: 4 },
    { data:6, label: "channel 6", key: 5 },
    { data:7, label: "channel 7", key: 6 },
    { data:8, label: "channel 8", key: 7 },
    { data:9, label: "channel 9", key: 8 },
    { data:10, label: "channel 10", key: 9 },
    { data:11, label: "channel 11", key: 10 },
    { data:12, label: "channel 12", key: 11},
  ]);
  selectedChannel: any;
  raAlarmObjects: any[] = [];
 
  isAddRelay: FormControl = new FormControl(false, Validators.required);
  isAddHooter: FormControl = new FormControl(false, Validators.required);
  // CCObjectsCount: any[] = [];
  alarmSelectedViol: any[] = [
    { analytics_type: "RA", classes: [], alarm: false, roi_key_id: [] },
    { analytics_type: "PPE", alarm: false, classes: ["helmet", "vest"] },
    { analytics_type: "fire" },
  ];
  // fireROIS: any[] = []; 
  AlarmAITypes: any[] = [];
  
  // fireROIColor: string = "";
  // fireAndSmoke = {
  //   fire: false,
  //   smoke: false,
  //   dust: false,
  // };
  alertForm: FormGroup = new FormGroup({
    ip: new FormControl("", Validators.required),
    delay: new FormControl("", Validators.required),
  });

  alarmPPEObjects: FormGroup = new FormGroup({
    helmet: new FormControl(Validators.requiredTrue),
    vest: new FormControl(Validators.requiredTrue),
  });

  alarmRAObjects: FormGroup = new FormGroup({
    person: new FormControl(Validators.requiredTrue),
    car: new FormControl(Validators.requiredTrue),
    truck: new FormControl(Validators.requiredTrue),
    bike: new FormControl(Validators.requiredTrue),
  });

  isVoiceAlert = false;
  
  
  
  @ViewChild("roiInfo") infoModal: ElementRef<any>;
 

  editAlertForm: FormGroup = new FormGroup({
    alarmType: new FormControl("", Validators.required),
    alarmIp: new FormControl("", Validators.required),
    alarmEnable: new FormControl(false),
    hooterIp: new FormControl("", Validators.required),
    relayIp: new FormControl("", Validators.required),
    delay: new FormControl("", Validators.required),
  });

 
  
  // classIDTruck: FormControl = new FormControl(0, Validators.required);
  // CrowdData: any[] = [];
  
  // vehicleForm: FormGroup = new FormGroup({
  //   type: new FormControl(),
  //   make: new FormControl(),
  // });
  
   // CCClasses: any[] = [];
 
  // alertType: FormControl = new FormControl("", Validators.required);
 
  //traffic count roi variables
 
  // isLoading: boolean = false;
  // personCrowdConfig: any;
  // vehicleCrowdConfig: any;
  // ppeObjects: any[] = [];
  // ccObjects: any[] = [];
  // counter: number = 0
  // loader1: boolean = false;
  // editField: string = "";
  // ROIsRoiPoints: any[] = [];
  // spillageData: any[] = [];
  // isFire: boolean = false;
  
  // AllROIs: {}[] = [];
  // rectangle: any;
  // tempData: any[] = [];
  // selectedCCType: any;
  
   
  // fireSmoke: any[] = [
  //   {
  //     label: "+ Fire/Smoke",
  //     items: [
  //       {
  //         label: "ROI",
  //         command: (onclick: any) => {
  //           this.AddCCROI();
  //         },
  //       },
  //       {
  //         label: "Full Frame",
  //         command: (onclick: any) => {
  //           this.AddCCROI();
  //         },
  //       },
  //       {
  //         label: "Full Frame",
  //         command: (onclick: any) => {
  //           this.AddCCFullFrame();
  //         },
  //       },
  //     ],
  //   },
  // ];

 

  constructor(
    private ActiveRoute: ActivatedRoute,
    private server: CameraRoiService,
    private router: Router,
    public configService:configService,
    private modalService: NgbModal,
    
  ) {
    this.IP = server.IP;
    
    this.ActiveRoute.queryParams.subscribe((params: any) => {
      this.ID = params.id;
      this.imageName = params.image;
      this.currentArea = params.area;
      this.currentPlant = params.plant;
    });
  }

  ngOnInit(): void {

   
  }

  ngAfterViewInit(): void {

    this.server.GetRACameraData(this.ID).subscribe((response: any) => {

      this.canvasSetup();
      this.makeNewROI();
      this.canvas.on("mouse:up", (options: any) => {
        if (
          this.roiType == 1 ||
          this.isAddCCROI ||
          this.isWater ||
          this.isAddSpillageROI||
          this.isAddParkingROI||
          this.isAddTraffic_jamROI
        ) {
          if (options.button === 1 && !this.isPolygonDrawn) {
            if (
              !(options.transform == null
                ? false
                : options.transform.action === "modifyPolygon"
                ? false
                : true) &&
              !this.isEdit
            ) {
              this.getClickCoords(options);
            }
          }
          if (options.button === 3) {
            if (
              this.isAddRAROI ||
              this.isAddCCROI ||
              this.isWater ||
              this.isAddSpillageROI||
              this.isAddParkingROI||
              this.isAddTraffic_jamROI
            ) {
              if (this.newROIPoints.length < 4) {
                this.isPolygonDrawn = false;
              } else {
                this.isPolygonDrawn = true;
              }
            }
          }
        }

        if (this.roiType == 2 && !this.isAddCCROI && !this.isWater) {
          this.isMouseDown = false;
          this.SaveTrafficCountROI();
        }
      });

      this.canvas.on("mouse:down", (event: any) => {
        if (
          this.roiType === 1 &&
          (this.isAddCCROI || this.isWater || this.isAddRAROI || this.isAddSpillageROI ||this.isAddParkingROI||this.isAddTraffic_jamROI)
        ) {
          if (
            this.isAddRAROI ||
            this.isAddCCROI ||
            this.isWater ||
            this.isAddSpillageROI||
            this.isAddParkingROI||this.isAddTraffic_jamROI
          ) {
            if (event.button === 3) {
              if (this.newROIPoints.length < 3) {
                this.isPolygonDrawn = false;
              } else {
                this.RAROIName.markAsUntouched();
                this.RoiName();
                this.isPolygonDrawn = true;
              }
            }
          }
        } else if (this.roiType === 2) {
          if (
            event.transform == null
              ? true
              : event.transform.action === "drag"
              ? false
              : true
          ) {
            this.addingShapeOnMouseDown(event);
          }
        }

        this.canvas.on("mouse:move", (options: any) => {
          this.creatingShapeOnMouseMove(options);
        });
      });
      this.canvas.on("object:moving", (options: any) => {});
      this.cameraData = response.message;

      this.AISolutions = this.cameraData[0].ai_solution
        ? this.cameraData[0].ai_solution
        : {};
      this.currentArea = response.area;
      this.currentPlant = response.plant;
      this.CameraDataObservable = of(response.message);
      this.isCameraData = true;
      if (this.cameraData[0].roi_data != null) {
        this.GetPanelPoints();
      }
      if(this.cameraData[0]?.vpms_data !== null){
        this.GetParkingPoints();
        //  this.cameraData[0]?.vpms_data.map((index:any)=>
        // {

        // })
      }

      if(this.cameraData[0]?.trafficjam_data !== null){
        this.GetTraffic_JamPoints();
      }
      

      if (this.cameraData[0].ppe_data.length > 0) {
        this.PPEForm.get("helmet").valueChanges.subscribe((value: any) => {});
        this.PPEConfig = this.cameraData[0].ppe_data[0];
        if (this.cameraData[0].ppe_data[0].helmet) {
          this.PPEForm.get("helmet").setValue(true);
          this.PPEForm.get("helmet").markAsUntouched();
        } else {
          this.PPEForm.get("helmet").setValue(false);
        }
        if (this.cameraData[0].ppe_data[0].vest) {
          this.PPEForm.get("vest").setValue(true);
        } else {
          this.PPEForm.get("vest").setValue(false);
        }
      } 
      else {
        this.PPEForm.get("vest").setValue(false);
        this.PPEForm.get("helmet").setValue(false);
      }
      if (this.cameraData[0].firesmoke_data != undefined) {
        if (this.cameraData[0].firesmoke_data.length > 0) {
          this.fireSmokeDustForm
            .get("fire")
            .setValue(this.cameraData[0].firesmoke_data[0].fire);
          this.fireSmokeDustForm
            .get("smoke")
            .setValue(this.cameraData[0].firesmoke_data[0].smoke);
          this.fireSmokeDustForm
            .get("dust")
            .setValue(this.cameraData[0].firesmoke_data[0].dust);

          this.cameraType.setValue(
            this.cameraData[0].firesmoke_data[0].camera_type
          );
          this.sensgiz = new FormArray([]);

          this.cameraData[0].firesmoke_data[0].presets.forEach(
            (value: any, index: number) => {
              this.sensgiz.push(
                new FormGroup({
                  coinLocation: new FormControl("", [Validators.required]),
                  presetId: new FormControl("", [
                    Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
                    Validators.min(0),
                    Validators.required,
                  ]),
                })
              );

              this.sensgiz.controls[index]
                .get("coinLocation")
                .setValue(value.presetlocation);
              this.sensgiz.controls[index]
                .get("presetId")
                .setValue(value.presetid);
            }
          );
        }
      }
      this.fireSmokeDustForm.valueChanges.subscribe((value: any) => {
        if (
          this.fireSmokeDustForm.get("fire").value == false &&
          this.fireSmokeDustForm.get("dust").value == false &&
          this.fireSmokeDustForm.get("smoke").value == false
        ) {
          // if((this.cameraData[0].firesmoke_data!=undefined) ||(this.cameraData[0].firesmoke_data.length==0)){
          if (this.cameraData[0].firesmoke_data.length > 0) {
            this.DeleteFireSmokeFrame();
          }
          // }
        }
      });
    });

    //___adding functionality to canvas

    //-----
    this.editAlertForm.valueChanges.subscribe((value: any) => {
      this.responseMessage = "";
      if (
        this.editAlertForm.get("alarmType").value == "hooter" ||
        this.editAlertForm.get("alarmType").value == "relay"
      ) {
        if (this.editAlertForm.get("alarmIp").value != "") {
          this.isAlertFormValid = true;
        }
      } else if (this.editAlertForm.get("alarmType").value == "sensegiz") {
        if (this.sensgiz.length > 0) {
          this.isAlertFormValid = true;
        } else {
          this.isAlertFormValid = false;
        }
      }
    });

    // this.CCObjectsMinMax.forEach((form: FormGroup) => {
    //   form.valueChanges.subscribe(() => {
    //     console.log("object form valid status");
    //     if (
    //       form.get(form.get("object").value).value &&
    //       form.get("min").valid &&
    //       form.get("min").valid
    //     ) {
    //       this.CCValid++;
    //     } else {
    //       this.CCValid = 0;
    //     }

    //     if (
    //       form.get("min").value > form.get("max").value ||
    //       form.get("min").value == form.get("max").value
    //     ) {
    //       this.CCValid = 0;
    //     }
    //     console.log(this.CCValid);
    //   });
    // });

    this.CCObjectsMinMax[0].valueChanges.subscribe(() => {
      if (
        this.CCObjectsMinMax[0].get("object").value &&
        this.CCObjectsMinMax[0].get("min").valid &&
        this.CCObjectsMinMax[0].get("max").valid
      ) {
        this.CCValid++;
      } else {
        this.CCValid = 0;
      }

      if (
        this.CCObjectsMinMax[0].get("min").value >
          this.CCObjectsMinMax[0].get("max").value ||
        this.CCObjectsMinMax[0].get("min").value ==
          this.CCObjectsMinMax[0].get("max").value
      ) {
        this.CCValid = 0;
      }
    });
  }

  RoiName() {
    this.isPolygonDrawn = true;
    // this.isAddRAROI = false;
    // this.classIds = ["person"];

    if (this.isAddCCROI) 
    {
      this.modalService.open(this.CCROINameModal).result.then(
        (result) => {
          this.CCROIName.reset();
          this.DeleteNewDrawnROI();
        },
        (reason) => {
         
          this.CCROIName.reset();
          this.DeleteNewDrawnROI();
        }
      );
    } 
    // else if (this.isWater) 
    // {
    //   this.isWater = false;
    //   this.modalService.open(this.fireROINameModal, {
    //     backdrop: "static",
    //     centered: true,
    //   });
    // } 
    else if (this.isAddSpillageROI) 
    {

      this.modalService.open(this.spillageROINameModal, {
        backdrop: "static",
        centered: true,
      }).result.then(
        (result)=>{
  
          this.spillageROIName.reset();
          this.DeleteNewDrawnROI();

        },
        (reason) =>{
          
          this.spillageROIName.reset();
          this.DeleteNewDrawnROI();
        }

      );
    } 
    else if(this.isAddParkingROI)
    {
      
      this.modalService.open(this.SelectionModal, {
          size: "small",
          centered: true,
          backdrop: "static",
        })
        .result.then(
          (result) => {
          
            this.parkingROIName.reset();
            this.DeleteNewDrawnROI();
          },
          (reason) => {
        
            this.parkingROIName.reset();
            this.DeleteNewDrawnROI();

          }
        );

    }
      else if(this.isAddTraffic_jamROI)
      {
      
      this.modalService
            .open(this.Traffic_JamROINameModal, {
              size: "small",
              centered: true,
              backdrop: "static",
            })
            .result.then(
              (result) => {
               
                this.traffic_jamROIName.reset();
                this.DeleteNewDrawnROI();
              },
              (reason) => {
                
                this.traffic_jamROIName.reset();
                this.DeleteNewDrawnROI();

              }
            );
    }
    else {
      this.modalService
        .open(this.RAROINameModal, {
          size: "small",
          centered: true,
          backdrop: "static",
        })
        .result.then(
          (result) => {
          
            this.RAROIName.reset();
            this.DeleteNewDrawnROI();
          },
          (reason) => {
            
            this.RAROIName.reset();
            this.DeleteNewDrawnROI();

          }
        );
    }
  }

  DeleteNewDrawnROI() {
    this.isPolygonDrawn = false;

    this.isAddCCROI = false;
    this.isAddRAROI = false;
    if (this.roiType == 2 || this.btnIndex == 1) {
      this.DeleteNewTCRoi();
    }
    this.isAddSpillageROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;
    
    this.newROIPoints.splice(0, this.newROIPoints.length);

    this.canvas.renderAll();
    
  }


  
  Back() {
    window.close();
  }

  canvasSetup() {
    var canvasContainer = document.getElementById("canvas-container");
    this.canvas = new fabric.Canvas("canvasROI", { fireRightClick: true });
    this.canvas.selection = false;
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    // console.log(this.canvasContainer.clientx)
    // this.canvas.setWidth(img.width)
    this.SetCameraImageToCanvas();
  }

  
  SetCameraImageToCanvas() {
    fabric.Image.fromURL(
      this.IP + "/get_roi_image/" + this.imageName,
      (img: any) => {
        console.log(img.width);
        console.log(img.height);
        this.canvas.setWidth(img.width);

        //var newHeight= this.CalculateAspectRatio(img.width,img.height,cContainer.clientWidth)
        this.canvas.setHeight(img.height);

        this.canvas.setBackgroundImage(
          img,
          this.canvas.requestRenderAll.bind(this.canvas),
          {
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height,
          }
        );
      }
    );
  }


  makeNewROI() {
    this.newROI = new fabric.Polygon(this.newROIPoints, this.polygonOptions);
  }

  getClickCoords(event: any) {
    if (this.isAddRAROI || this.isWater || this.isAddCCROI || this.isAddSpillageROI|| this.isAddParkingROI || this.isAddTraffic_jamROI) {
      this.newPt = {
        x: Math.round(event.pointer.x),
        y: Math.round(event.pointer.y),
      };
      this.newROIPoints.push(this.newPt);

      this.canvas.add(this.newROI);
    }
  }


 
  SetRelayOrHooter(event: any, index: any, data?: any, alarmType?: string) {
    // this.editField = "alarmStatus";
    this.selectedRoi = data;
    this.selectedEditId = index;
    if (event.target.checked) {
      typeof this.allCameraData[this.selectedEditId].roi_data.alarm_type[
        alarmType
      ] == "boolean"
        ? (this.allCameraData[this.selectedEditId].roi_data.alarm_type[
            alarmType
          ] = true)
        : "";
      // typeof (this.cameraData[0].roi_data[this.selectedEditId].roi_data.alarm_type[alarmType])=='boolean'?this.cameraData[0].roi_data[this.selectedEditId].alarm_type[alarmType]=true:'';
    } else {
      typeof this.allCameraData[this.selectedEditId].roi_data.alarm_type[
        alarmType
      ] == "boolean"
        ? (this.allCameraData[this.selectedEditId].roi_data.alarm_type[
            alarmType
          ] = false)
        : "";
      // typeof this.cameraData[0].roi_data[this.selectedEditId].alarm_type[alarmType]=='boolean'?this.cameraData[0].roi_data.alarm_type[alarmType]=false:''
    }
    this.SaveEditedRAROI();
  }

 
 
  

  isDelete(i: number, modal: any, field: any) {
    this.deleteField = field;
    this.deleteID = i;
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }


  ModalOpen(modal: any) {
    if (this.cameraData.length > 0) {
      this.alertForm.get("ip").setValue(this.cameraData[0].alarm_ip_address);
      this.cameraData[0].delay
        ? this.alertForm.get("delay").setValue(this.cameraData[0].delay)
        : "";
    }
    this.modalService.open(modal, {
      backdrop: "static",
      keyboard: true,
      centered: true,
    });
  }

  ClassId(event: any) {
    console.log(event,'this is event from the classid')
    if (event.target.checked) {
      this.selectedObjects.push(event.target.value);
      
    } else {
      var index = this.selectedObjects.indexOf(event.target.defaultValue);
      this.selectedObjects.splice(index, 1);
    }

  }

  DeleteROI() {

    if (this.deleteField == "RA") {

      var id = this.deleteID;

        this.allCameraData.length > 0
          ? (this.AISolutions.RA = true)
          : (this.AISolutions.RA = false);

        var data = {
          id: this.ID,
          roi_id: String(roi_id),
          ai_solutions: this.AISolutions,
        };

        this.server.DeleteRoi(data).subscribe(
          (response: any) => {
            if(response.success){

              var tempRoiCanvas = this.allCameraData[id].roi_canvas;
              var tempTextCanvas = this.allCameraData[id].roi_name_canvas;
              this.canvas.remove(tempRoiCanvas);
              this.canvas.remove(tempTextCanvas);
      
              // var roi = this.allCameraData[id];
              // var roi_id = roi.roi_data.roi_id;

              this.allCameraData.splice(id, 1);
              this.cameraData[0].roi_data.splice(id, 1);

              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
            else{
              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
           
          },
          (Err) => {
            this.modalService.dismissAll();
            this.server.notification("Something went wrong", "Retry");
          }
        );

        this.canvas.renderAll();
      
    } 
    else if (this.deleteField == "Water") {

      this.DeleteWaterROIS(this.deleteID);

    } 
    else if (this.deleteField == "spillage") {

      this.spillageData.length > 0
        ? (this.AISolutions.spillage = true)
        : (this.AISolutions.spillage = false);

      let data = {
        id: this.ID,
        roi_id: this.spillageData[this.deleteID].roi_data.roi_id,
        ai_solutions: this.AISolutions,
      };

      this.server.DeleteSpillageRoi(data).subscribe(
        (response: any) => {

          if (response.success) {

            // window.location.reload()
            var tempRoiCanvas = this.spillageData[this.deleteID].roi_canvas;
            var tempTextCanvas = this.spillageData[this.deleteID].roi_name_canvas;
            this.canvas.remove(tempRoiCanvas);
            this.canvas.remove(tempTextCanvas);

            this.cameraData[0].spillage_roi_data.splice(this.deleteID, 1);
            this.spillageData.splice(this.deleteID, 1);

            this.server.notification(response.message);
            this.modalService.dismissAll();

          } else {
            this.server.notification(response.message, "Retry");
            this.modalService.dismissAll();
          }
        },
        (Err) => {
          this.modalService.dismissAll();
          this.server.notification("Error while fetching the data", "Retry");
        }
      );
      this.canvas.renderAll();
    }

     else if (this.deleteField === "parking") {
      
        var roi_id = this.parkingData[this.deleteID].vpms_data.roi_id;

        this.parkingData.length > 0
          ? (this.AISolutions.Parking = true)
          : (this.AISolutions.Parking = false);
        
        var data = {
          id: this.ID,
          roi_id: String(roi_id),
          ai_solutions: this.AISolutions,
        };

        this.server.DeleteParkingRoi(data).subscribe(
          (response: any) => {
            if(response.success){

              var tempRoiCanvas = this.parkingData[this.deleteID].roi_canvas;
              var tempTextCanvas = this.parkingData[this.deleteID].roi_name_canvas;
              this.canvas.remove(tempRoiCanvas);
              this.canvas.remove(tempTextCanvas);
              
              this.cameraData[0].vpms_data.splice(this.deleteID, 1);
              this.parkingData.splice(this.deleteID, 1);

              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
            else{
              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
            
          },
          (Err) => {
            this.modalService.dismissAll();
            this.server.notification("Something went wrong", "Retry");
          }
        );

        this.canvas.renderAll();
    }
    else if (this.deleteField == "traffic-jam") {
      
      var roi_id = this.traffic_jamData[this.deleteID].trafficjam_data.roi_id;

      this.traffic_jamData.length > 0
        ? (this.AISolutions.Traffic_Jam = true)
        : (this.AISolutions.Traffic_Jam = false);

        var data = {
          id: this.ID,
          roi_id: String(roi_id),
          ai_solutions: this.AISolutions,
        };

        this.server.DeleteTraffic_JamRoi(data).subscribe(
          (response: any) => {

            if(response.success){

              var tempRoiCanvas = this.traffic_jamData[this.deleteID].roi_canvas;
              var tempTextCanvas = this.traffic_jamData[this.deleteID].roi_name_canvas;
              this.canvas.remove(tempRoiCanvas);
              this.canvas.remove(tempTextCanvas);
              
              this.cameraData[0].trafficjam_data.splice(this.deleteID, 1);
              this.traffic_jamData.splice(this.deleteID, 1);
              
              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
            else {
              this.server.notification(response.message);
              this.modalService.dismissAll();
            }
          },
          (Err) => {
            this.modalService.dismissAll();
            this.server.notification("Something went wrong", "Retry");
          }
        );
        this.canvas.renderAll();
    }
    
    else {

    }
  }

/*------------------------------------------------ Crowd Count (CC) Related Functions----------------------*/
  OnCCTypeSelect(event: any) {
    if (this.selectedCCMode.data == 0) {
      this.AddNewCCROI();
    } else {
      this.AddCCFullFrame();
    }
  }

  AddNewCCROI() {
    this.isPolygonDrawn = false;

    this.isAddCCROI = true;
    this.isAddRAROI = false;
    this.isAddSpillageROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI= false;

    this.isEdit = false;
    this.isWater = false;
    
    this.roiType = 1;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    // this.CrowdForm.get("min").reset();
    // this.CrowdForm.get("min").setValidators(Validators.required);
    // this.CrowdForm.get("min").setValidators(Validators.pattern(/\d+/));
    // this.CrowdForm.get("max").reset();
    // this.CrowdForm.get("max").setValidators(Validators.required);
    // this.CrowdForm.get("max").setValidators(Validators.pattern(/\d+/));
    this.newROI.stroke = "rgb(0, 255, 255)";
  }

  AddCCFullFrame() {
    this.modalService.open(this.CCFullFrameModal, { centered: true }).result.then(
      (result) => {

        // this.CrowdForm.get("min").reset();
        // this.CrowdForm.get("max").reset();
        // this.DeleteNewDrawnROI();
        
      },
      (reason) => {
        
      }
    );
  }

  SaveCCFullFrame() {
    
    for (let index = 0; index < 1; index++) {
      const form: FormGroup = this.CCObjectsMinMax[index];

      if (
        form.get(form.get("object").value).value &&
        form.get("min").valid &&
        form.get("min").valid &&
        !(
          form.get("min").value > form.get("max").value ||
          form.get("min").value == form.get("max").value
        )
      ) {
        this.CCValid = 1;
      } else {
        this.CCValid = 0;
        // break;
      }
    }
    if (this.CCValid == 1) {
      this.CCObjectCounts = [];
      this.CCObjectsMinMax.forEach((form: FormGroup) => {

        if (form.get(form.get("object").value).value) {

          var obj = {
            class_name: form.get("object").value,
            min_count: form.get("min").value,
            max_count: form.get("max").value,
          };

          this.CCObjectCounts.push(obj);
        }

        form.get(form.get("object").value).reset();
        form.get("min").reset();
        form.get("max").reset();
       

        //  form.get('object').reset()
      });

      var tempObj: any = {
        roi_name_canvas: null,
        roi_canvas: null,
        roi_id: null,
        roi_name: null,
        cr_data: {
          bb_box: "",
          full_frame: true,
          roi_id: null,
          area_name: "",
          data_object: this.CCObjectCounts,
        },
      };
      this.CCData.push(tempObj);
      // this.CrowdForm.get("min").reset();
      // this.CrowdForm.get("max").reset();

      // this.newROIPoints.splice(0, this.newROIPoints.length);

      // this.classIDPerson.reset();
      // this.classIDBike.reset();
      // this.classIDCar.reset();
      // this.classIDPerson.setValue("person");
      // this.classIds = ["person"];
      // this.CrowdForm.get("min").reset();
      // this.CrowdForm.get("min").setValidators(Validators.required);
      // this.CrowdForm.get("min").setValidators(Validators.pattern(/\d+/));

      // this.CrowdForm.get("max").reset();

      // this.CrowdForm.get("max").setValidators(Validators.required);
      // this.CrowdForm.get("max").setValidators(Validators.pattern(/\d+/));
      this.modalService.dismissAll();
      this.AddCCData();
    }
  }

  AddCCData() {
    this.CCROIName.reset();

    var crowdCountData: any;
    if (this.CCData.length > 0) {
      crowdCountData = this.CCData[this.CCData.length - 1].cr_data;
    }

    this.CCData.length > 0
      ? (this.AISolutions.CR = true)
      : (this.AISolutions.CR = false);

    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      cr_data: [crowdCountData],
    };

    this.server.AddCrowdCount(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.CameraSettingsChanges.next(true);

          window.location.reload();
          this.server.notification(response.message);
          this.RefreshCameraData();
        } else {
          this.server.notification(response.message, "Retry");
          this.canvas.remove(this.CCData[this.CCData.length - 1].roi_canvas);
          this.canvas.remove(
            this.CCData[this.CCData.length - 1].roi_name_canvas
          );
          this.canvas.renderAll();
        }
      },
      (Err) => {
        this.canvas.remove(this.CCData[this.CCData.length - 1].roi_canvas);
        this.canvas.remove(this.CCData[this.CCData.length - 1].roi_name_canvas);
        this.canvas.renderAll();
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  DeleteCCFullFrame() {

    this.AISolutions.CR = false;

    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
    };

    this.server.deleteCCFrameData(data).subscribe(
      (data: any) => {
        if (data.success) {

          this.CCTypeList = of([
            { label: "ROI", data: 0 },
            { label: "Full Frame", data: 1 },
          ]);

          window.location.reload();
          
        }
        this.server.notification(data.message);
      },
      (Err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
    this.canvas.renderAll();
  }

  OnAddingNewCCROI() {
    // this.CCClasses = [];
    this.CCObjectCounts = [];
    this.isAddCCROI = false;
    var exist = false;

    this.cameraData[0].cr_data.forEach((element: any) => {
      element.roi_name == this.CCROIName.value
        ? (exist = true)
        : (exist = false);
    });

    if (!exist) {
      if (this.CCROIName.value !== null) {

        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        var dimensions = this.newROI._calcDimensions();
        this.polygonOptions.stroke = "rgb(0, 255, 255)";
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ccName = this.CCROIName.value;
        if (ccName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = Math.round(this.newROIPoints[i].x);

            let tempY = Math.round(this.newROIPoints[i].y);
            roi_points.push(`${tempX};${tempY};`);
          }
          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ccName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black",

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: "rgb(0, 255, 255)",
            fill: "rgb(0, 255, 255)",
          });
          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          this.CCObjectsMinMax.forEach((form: FormGroup) => {
            if (form.get(form.get("object").value).value) {
              var obj = {
                class_name: form.get("object").value,
                min_count: form.get("min").value,
                max_count: form.get("max").value,
              };
              this.CCObjectCounts.push(obj);
            }
            form.get(form.get("object").value).reset();
            // form.get("min").markAsUntouched();
            // form.get("min").setValue(0);

            form.get("max").reset();
            form.get("min").reset();

            //  form.get('object').reset()
          });

          var tempObj = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            roi_id: ccName,
            roi_name: ccName,
            cr_data: {
              bb_box: roiPointsString,
              full_frame: false,
              roi_id: ++this.CCKeyId,
              area_name: ccName,
              data_object: this.CCObjectCounts,
            },
          };
        }
        // this.CameraData[0].ROI_data.push(tempObj.ROI_data)

        this.CCData.push(tempObj);
        this.modalService.dismissAll();
        this.AddCCData();
        this.newROIPoints.splice(0, this.newROIPoints.length);
        this.CCROIName.reset();
        // this.CrowdForm.get("min").reset();

        // this.CrowdForm.get("min").setValidators(Validators.required);
        // this.CrowdForm.get("min").setValidators(Validators.pattern(/\d+/));

        // this.CrowdForm.get("max").reset();

        // this.CrowdForm.get("max").setValidators(Validators.required);
        // this.CrowdForm.get("max").setValidators(Validators.pattern(/\d+/));
        this.classIds = ["person"];
      } else {
        
        this.classIds = ["person"];
        this.DeleteNewDrawnROI();
        // this.CrowdForm.get("min").reset();
        // this.CrowdForm.get("max").reset();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }


  ChangeCCName() {
    this.CCData[this.selectedId].roi_name = this.tempROIID.value;

    this.CCData[this.selectedId].roi_name_canvas.text = this.tempROIID.value;
    this.CCData[this.selectedId].roi_data.roi_name = this.tempROIID.value;
    this.canvas.renderAll();
    this.modalService.dismissAll();
    var crowdCountData: any;
    if (this.CCData.length > 0) {
      crowdCountData = this.CCData[this.CCData.length - 1].cr_data;
    }
    this.CCData.length > 0 ? (this.AISolutions.CR = true) : "";
    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      cr_data: [crowdCountData],
    };

    this.server.AddCrowdCount(data).subscribe((response: any) => {});
    this.SaveEditedRAROI();
  }

  


 

  DeleteCCROI() {
    var id = this.deleteID;
    if (true) {
      var tempRoiCanvas = this.CCData[id].roi_canvas;
      var tempTextCanvas = this.CCData[id].roi_name_canvas;
      this.canvas.remove(tempRoiCanvas);
      this.canvas.remove(tempTextCanvas);
      var roi = this.CCData[id];
      var roi_id = roi.cr_data.roi_id;
      this.CCData.splice(id, 1);
      this.cameraData[0].cr_data.splice(id, 1);
      this.CCData.length > 0
        ? (this.AISolutions.CR = true)
        : (this.AISolutions.CR = false);
      var data = {
        id: this.ID,
        roi_id: String(roi_id),
        ai_solutions: this.AISolutions,
      };
      this.modalService.dismissAll();

      this.server.deleteCCData(data).subscribe(
        (data: any) => {
          if (data.success) {
            window.location.reload();
          }
          this.server.notification(data.message);
          this.modalService.dismissAll();
        },
        (Err) => {
          this.modalService.dismissAll();
          this.server.notification("Something went wrong", "Retry");
        }
      );
      this.canvas.renderAll();
    }
  }

 

  

 

  GetCCRoiPoints() {
    this.cameraData[0].cr_data.forEach((points: any, id: number) => {
      this.CCKeyId = points.roi_id;

      var roi_points = points.bb_box.split(";");
      var polyGon: any[] = [];
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio,
        };
        polyGon.push(tempPoint);
      }
      var tempObj = {
        min_count: points.min_count,
        max_count: points.max_count,
        class_name: points.class_name,
        bbox_points: polyGon,
        area_name: points.area_name,
      };
      this.CCpoints.push(tempObj);
    });
    this.DrawExistCCRois();
  }
  DrawExistCCRois() {
    this.CCpoints.forEach((element: any, id: number) => {
      this.polygonOptions.stroke = "rgb(0, 255, 255)";
      var Polygon = new fabric.Polygon(
        element.bbox_points,
        this.polygonOptions
      );
      var text = new fabric.Text(element.area_name, {
        fontSize: 20,
        backgroundColor: "black",
        selectable: false,
        left: Polygon.left,
        top:
          Polygon.top != 0 && !(Polygon.top - 20 < 0) && Polygon.top - 20 != 0
            ? Polygon.top - 20
            : 20,
        stroke: "rgb(0, 255, 255)",
        fill: "rgb(0, 255, 255)",
      });

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_id: id,
        roi_name: this.cameraData[0].cr_data[id].area_name,
        cr_data: this.cameraData[0].cr_data[id],
      };

      this.CCData.push(tempObj);

      this.canvas.add(Polygon, text);
      this.canvas.renderAll();
    });
    this.GetTCPoints();
  }

  

  /*---------------------------------------- Danger Zone (RA) Related Functions------------------------------*/
  AddNewRAROI() {
    this.classIds = ["person"];
    this.isPolygonDrawn = false;

    this.isAddCCROI = false;
    this.isAddRAROI = true;
    this.isAddSpillageROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;

    this.polygonOptions.stroke = this.raROIColor;
    this.newROI.stroke = this.raROIColor;

    this.isEdit = false;
    this.isWater = false;
    
    this.roiType = 1;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
    
  }

  RAROINameSubmit() {
    this.modalService.dismissAll();
    this.OnAddingNewRAROI();
  }

  OnAddingNewRAROI() {
    this.isAddRAROI = false;
    // this.isAddParkingROI = false;
    // this.isAddTraffic_jamROI = false;
    var exist = false;

    this.cameraData[0].roi_data.forEach((element: any) => {
      element.roi_name == this.RAROIName.value
        ? (exist = true)
        : (exist = false);
    });

    if (!exist) {
      if (this.RAROIName.value !== null) {

        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        this.polygonOptions.stroke = this.raROIColor;
        var dimensions = this.newROI._calcDimensions();
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ROIName = this.RAROIName.value;

        if (ROIName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = this.newROIPoints[i].x;

            let tempY = this.newROIPoints[i].y;
            roi_points.push(`${tempX};${tempY};`);
          }

          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ROIName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black",

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: this.raROIColor,
            fill: this.raROIColor,
          });

          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          var tempObj: any = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            // roi_id: ROIName,need to check this one
            roi_name: ROIName,
            roi_id: this.allCameraData.length - 1,
            roi_data: {
              bb_box: roiPointsString,
              roi_name: ROIName,
              roi_id: this.allCameraData.length - 1,
              label_name: this.classIds,
              alarm_type: {
                hooter: null,
                relay: null,
              },
              alarm_ip_address: {
                hooter_ip: null,
                relay_ip: null,
              },
            },
          };
          if (this.cameraData[0].alarm_type.hooter) {
            (tempObj.roi_data["alarm_type"]["hooter"] = this.isAddHooter.value),
              (tempObj.roi_data["alarm_ip_address"]["hooter_ip"] =
                this.cameraData[0].alarm_ip_address.hooter_ip);
          }
          if (this.cameraData[0]?.alarm_type?.relay) {
            tempObj.roi_data["alarm_type"]["relay"] = this.isAddRelay.value;
            tempObj.roi_data["alarm_ip_address"]["relay_ip"] =
              this.cameraData[0].alarm_ip_address.relay_ip;
              this.cameraData[0].alarm_version.relay=='type3'?tempObj.roi_data["alarm_type"].channel=this.selectedChannel? this.selectedChannel.data:1:''
          }
        }

        this.allCameraData.push(tempObj);

        this.newROIPoints.splice(0, this.newROIPoints.length);
        this.RAROIName.reset();
       
        this.SaveRAROIChanges();

      } else {
        this.DeleteNewDrawnROI();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }

  SaveRAROIChanges() {
    // var crowd_Data: any[] = [];
    // var crowdCountData: any[] = [];
    // if (this.CCData.length > 0) {
    //   this.CCData.forEach((element) => {
    //     crowdCountData.push(element.cr_data);
    //   });
    // }
    // if (
    //   this.peopleCrowdForm.get("min").value ||
    //   this.peopleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "people",
    //     min_count: this.peopleCrowdForm.get("min").value
    //       ? this.peopleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.peopleCrowdForm.get("max").value
    //       ? this.peopleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }
    // if (
    //   this.vehicleCrowdForm.get("min").value ||
    //   this.vehicleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "vehicle",
    //     min_count: this.vehicleCrowdForm.get("min").value
    //       ? this.vehicleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.vehicleCrowdForm.get("max").value
    //       ? this.vehicleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }

    var roiData: any[] = [];
    this.allCameraData.forEach((element: any, id: number) => {
      roiData.push({ ...element.roi_data, roi_id: id + 1 });
    });
    
    roiData.length > 0
      ? (this.AISolutions.RA = true)
      : (this.AISolutions.RA = false);

    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      // imagename: this.imageName,
      roi_data: roiData,
      // tc_data: this.trafficCountData,
      ppe_data: [this.PPEConfig],
      // cr_data: crowdCountData,
      //edited
      // fire_smoke_data: [
      //   {
      //     fire: this.fireSmokeDustForm.get("fire").value,
      //     smoke: this.fireSmokeDustForm.get("smoke").value,
      //     dust: this.fireSmokeDustForm.get("dust").value,
      //     water: this.fireSmokeDustForm.get("water").value,
      //   },
      // ],
    };

    this.server.AddROI(cameraData).subscribe(
      (response: any) => {
        // this.isLoading = false;
        if (response.success) {
          window.location.reload();
          this.server.CameraSettingsChanges.next(true);
          this.server.notification(response.message);
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        // this.isLoading = false;
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  AlterRAROIName(id: number) {

    this.isEditText = !this.isEditText;
    this.selectedId = id;
    this.selectedEditId = id;

    this.tempROIID.setValue(this.allCameraData[id].roi_name);
    this.modalService.open(this.RAROINameChangeModal, {
      size: "small",
      animation: true,
      centered: true,
      backdrop: "static",
    });
  }

  ChangeRAROIName() {
    this.allCameraData[this.selectedId].roi_name = this.tempROIID.value;
    this.allCameraData[this.selectedId].roi_name_canvas.text =this.tempROIID.value;
    this.allCameraData[this.selectedId].roi_data.roi_name =this.tempROIID.value;
    this.canvas.renderAll();
    this.modalService.dismissAll();
    this.SaveEditedRAROI();
  }

  SaveEditedRAROI() {

    // if (
    //   this.peopleCrowdForm.get("min").value ||
    //   this.peopleCrowdForm.get("max").value
    // ) {
    //   var crowTemp: any = {
    //     label_name: ["people"],
    //     min_count: this.peopleCrowdForm.get("min").value
    //       ? this.peopleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.peopleCrowdForm.get("max").value
    //       ? this.peopleCrowdForm.get("max").value
    //       : 0,
    //     roi_id: null,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }
    // if (
    //   this.vehicleCrowdForm.get("min").value ||
    //   this.vehicleCrowdForm.get("max").value
    // ) {
    //   var crowTemp: any = {
    //     label_name: ["vehicle"],
    //     min_count: this.vehicleCrowdForm.get("min").value
    //       ? this.vehicleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.vehicleCrowdForm.get("max").value
    //       ? this.vehicleCrowdForm.get("max").value
    //       : 0,
    //     roi_id: null,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }
    var roiData: any[] = [];
    var roi_points: any[] = [];

    if (this.selectedEditId != null) {
      for (
        let i = 0;
        i < this.allCameraData[this.selectedEditId].roi_canvas.points.length;
        i++
      ) {

        var points = this.allCameraData[this.selectedEditId].roi_canvas.points;
        let tempX = Math.round(points[i].x);

        let tempY = Math.round(points[i].y);
        roi_points.push(`${tempX};${tempY};`);
      }
      //to remove the ,
      var comma = /,/g;
      var roiPointsString = roi_points.toString().replace(comma, "");

      this.allCameraData[this.selectedEditId].roi_data.bb_box = roiPointsString;

      roiData.push({ ...this.allCameraData[this.selectedEditId].roi_data });
    }

    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      // imagename: this.imageName,
      roi_data: roiData,
      roi_id: this.allCameraData[this.selectedEditId].roi_data.roi_id,
      // ppe_data: [this.PPEConfig],
    };

    this.server.EditROI(cameraData).subscribe(
      (response: any) => {

        if (response.success) {
          this.server.notification(response.message);
           window.location.reload();
        } 
        else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }
  


 



  

  GetPanelPoints() {
    this.cameraData[0].roi_data.forEach((points: any, id: number) => {
      var roi_points = points.bb_box.split(";");
      this.raObjects.push(...points.label_name);
      var polyGon: any[] = [];
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio,
        };
        polyGon.push(tempPoint);
      }
      var tempObj = {
        roi: polyGon,
        roi_name: points.roi_name,
      };
      this.RAPoints.push(tempObj);
    });
    this.raObjects = this.RemoveDuplicates(this.raObjects);

    this.GetCCRoiPoints();

    this.DrawExistPanels();
  //  this. DrawExistParkingROIs();
  // this.GetParkingPoints();
  }

  DrawExistPanels() {
    this.RAPoints.forEach((element: any, id: number) => {
      this.polygonOptions.stroke = this.raROIColor;
      var Polygon = new fabric.Polygon(element.roi, this.polygonOptions);
      var text = new fabric.Text(element.roi_name, {
        fontSize: 20,
        backgroundColor: "black",
        selectable: false,
        left: Polygon.left + 10,
        top: Polygon.top + 50,
        stroke: this.raROIColor,
        fill: this.raROIColor,
      });

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_name: this.cameraData[0].roi_data[id].roi_name,
        roi_data: this.cameraData[0].roi_data[id],
        alarm_type: this.cameraData[0].roi_data[id].alarm_type,
        alarm_ip_address: this.cameraData[0].roi_data[id].alarm_type,
      };
      this.alarmSelectedViol[0].roi_key_id.push(element.key_id);
      this.RAKeyId = element.key_id;
      this.allCameraData.push(tempObj);
      this.canvas.add(Polygon, text);
      this.canvas.renderAll();
    });
  }

  



  /*-------------------------------------------- Traffic Count (TC) Related Functions----------------------*/

  AddNewTCLine() {
    // this.isPolygonDrawn = false;
    // this.classIds = ["person"];
    this.isAddCCROI = false;
    this.isAddRAROI = false;
    this.isAddSpillageROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;

    this.isWater = false;
    this.isEdit = false;
    
    this.roiType = 2;
    this.btnIndex = 1;
    
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
  }

  IsDeleteTC(modal: any, index: any) {
    this.deleteID = index;
    this.modalService.open(modal, { backdrop: "static", size: "xs" });
  }

  addingShapeOnMouseDown(event: any) {
    this.isMouseDown = true;
    var pointer = this.canvas.getPointer(event.e);

    if (this.btnIndex == 1) {
      var linePath = [pointer.x, pointer.y, pointer.x, pointer.y];

      this.line = new fabric.Line(linePath, {
        stroke: "rgb(127, 255, 0)",
        strokeWidth: 3,
        fill: "rgb(127, 255, 0)",
        originX: "center",
        originY: "center",
        hasControls: false,
        hasBorders: false,
        selectable: false,
        objectCaching: false,
        type: "line",
      });
      this.line.set({ x1: Math.round(pointer.x), y1: Math.fround(pointer.y) });
      this.canvas.add(this.line);
      this.activeObj = this.line;
    }
    if (this.btnIndex === 2) {
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
      this.line = new fabric.Line(points, {
        strokeWidth: 3,
        fill: "rgb(127, 255, 0)",
        stroke: "rgb(127, 255, 0)",
        originX: "center",
        originY: "center",
        id: "arrow_line",
        selectable: false,
        lockScalingFlip: true,
        objectCaching: false,
        //uuid : this.generateUUID(),
        type: "arrow",
      });
      var centerX = (this.line.x1 + this.line.x2) / 2;
      var centerY = (this.line.y1 + this.line.y2) / 2;
      this.deltaX = this.line.left - centerX;
      this.deltaY = this.line.top - centerY;

      this.triangle = new fabric.Triangle({
        left: this.line.get("x2") + this.deltaX,
        top: this.line.get("y2") + this.deltaY,
        originX: "center",
        originY: "center",
        selectable: false,
        pointType: "arrow_start",
        angle: -45,
        width: 20,
        height: 20,
        fill: "rgb(127, 255, 0)",
        id: "arrow_triangle",
        uuid: this.line.uuid,
      });

      this.canvas.add(this.line, this.triangle);
      this.activeObj = this.line;
    }
    this.canvas.requestRenderAll();
  }

  creatingShapeOnMouseMove(event: any) {
    if (this.isMouseDown === true) {
      var pointer = this.canvas.getPointer(event.e);
      if (this.btnIndex === 1) {
        this.line.set({
          x2: pointer.x,
          y2: pointer.y,
        });
      }
      if (this.btnIndex === 2) {
        this.line.set({
          x2: pointer.x,
          y2: pointer.y,
        });

        if (this.btnIndex == 2) {
          this.triangle.set({
            left: pointer.x + this.deltaX,
            top: pointer.y + this.deltaY,
            angle: this._FabricCalcArrowAngle(
              this.line.x1,
              this.line.y1,
              this.line.x2,
              this.line.y2
            ),
          });
        }
      }
    }
    this.canvas.requestRenderAll();
  }
  _FabricCalcArrowAngle(x1: any, y1: any, x2: any, y2: any) {
    var angle = 0,
      x,
      y;
    x = x2 - x1;
    y = y2 - y1;
    if (x === 0) {
      angle = y === 0 ? 0 : y > 0 ? Math.PI / 2 : (Math.PI * 3) / 2;
    } else if (y === 0) {
      angle = x > 0 ? 0 : Math.PI;
    } else {
      angle =
        x < 0
          ? Math.atan(y / x) + Math.PI
          : y < 0
          ? Math.atan(y / x) + 2 * Math.PI
          : Math.atan(y / x);
    }
    return (angle * 180) / Math.PI + 90;
  }

  

  OnDeleteTCROI() {
    var index = this.deleteID;
    this.tempTCCanvas[index].forEach((roi: any) => {
      this.canvas.remove(roi);
      this.canvas.renderAll();
    });
    this.trafficCountData.length <= 1
      ? (this.AISolutions.TC = false)
      : (this.AISolutions.TC = true);
    this.trafficCountLineROIS = [];
    this.btnIndex = 1;
    var data = {
      id: this.ID,
      roi_id: this.trafficCountData[index].roi_id,
      ai_solutions: this.AISolutions,
    };
    this.server.deleteTCData(data).subscribe((response: any) => {
      this.server.notification(response.message);
      if (response.success) {
        this.server.CameraSettingsChanges.next(true);
        this.trafficCountData.splice(index, 1);
        this.modalService.dismissAll();
      } else {
        this.server.notification(response.message, "Retry");
      }
    });
  }


  TrafficCountConfig(event: any) {
    if (event.target.checked) {
      this.TrafficConfig = event.target.value;
    }

    this.modalService.dismissAll();
  }

  

  AddTrafficCountData() {
    var exist = false;

    this.cameraData[0].tc_data.forEach((element: any) => {
      element.area_name == this.tcName.value ? (exist = true) : (exist = false);
    });

    if (!exist) {
      var temp: any = {};
      var tempCanvas: any[] = [];
      temp.line =
        Math.round(Math.abs(this.trafficCountLineROIS[0].x1)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[0].y1)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[0].x2)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[0].y2)).toString() +
        ";";
      temp.arrow =
        Math.round(Math.abs(this.trafficCountLineROIS[1].x1)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[1].y1)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[1].x2)).toString() +
        ";" +
        Math.round(Math.abs(this.trafficCountLineROIS[1].y2)).toString() +
        ";";

      var tempObj = {
        class_name: this.classIds,
        line_bbox: temp,
        area_name: this.tcName.value,
        roi_id: ++this.TCKeyId,
        direction: this.TCDirection.value,
      };
      fabric.util.resetObjectTransform(this.newROI);
      var dimensionsLeft = this.line._getLeftToOriginX();
      var dimensionsTop = this.line._getTopToOriginY();
      var ROINameObject = new fabric.Text(this.tcName.value, {
        fontSize: 15,
        // bottom:5
        backgroundColor: "black",

        selectable: false,
        left: dimensionsLeft - 20,
        top: dimensionsTop - 30,
        stroke: "rgb(127, 255, 0)",
        fill: "rgb(127, 255, 0)",
      });
      tempCanvas = [...this.trafficCountLineROIS, ROINameObject];
      this.canvas.add(ROINameObject);
      this.canvas.renderAll();
      this.trafficCountData[this.trafficCountData.length] = tempObj;

      this.tempTCLineROIS.push(...this.trafficCountLineROIS);
      this.trafficCountLineROIS = [];
      this.btnIndex = 1;
      this.tempTCCanvas.push(tempCanvas);
      this.AddTCData();
      this.modalService.dismissAll();
    } else {
      this.DeleteNewTCRoi();
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }

  AddTCData() {
    var tcData: any = [];
    if (this.trafficCountData.length > 0) [(tcData = [])];
    this.trafficCountData.length > 0
      ? (this.AISolutions.TC = true)
      : (this.AISolutions.TC = false);

    var obj = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      tc_data: [this.trafficCountData[this.trafficCountData.length - 1]],
    };

    this.server.AddTCData(obj).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.CameraSettingsChanges.next(true);
          this.RefreshCameraData();
          this.server.notification(response.message);
          window.location.reload();
        } else {
          this.server.notification(response.message);
        }
      },
      (Err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  GetTCPoints() {
    var temp = {};
    this.trafficCountData = this.cameraData[0].tc_data;
    this.cameraData[0].tc_data.forEach((points: any, index: number) => {
      var tempPoints = points.line_bbox.line.split(";");
      var tempArrowPoints = points.line_bbox.arrow.split(";");

      temp = [
        {
          points: {
            x1: Number(tempArrowPoints[0]),
            y1: Number(tempArrowPoints[1]),
            x2: Number(tempArrowPoints[2]),
            y2: Number(tempArrowPoints[3]),
          },
          type: "arrow",
          area_name: points.area_name,
          roi_id: this.trafficCountData[index].roi_id,
        },
        {
          points: {
            x1: Number(tempPoints[0]),
            y1: Number(tempPoints[1]),
            x2: Number(tempPoints[2]),
            y2: Number(tempPoints[3]),
          },
          type: "line",
          area_name: points.area_name,
          roi_id: this.trafficCountData[index].roi_id,
        },
      ];
      this.tempTCData.push(temp);
      this.TCKeyId = points.roi_id;
    });
    this.drawExistTCRois(this.tempTCData);
  }

  drawExistTCRois(data: any) {
    this.tempTCCanvas = [];
    var temp: any[] = [];
    var line: any;
    var triangle: any;
    data.forEach((TCROI: any, i: number) => {
      temp = [];
      for (let index = 0; index < TCROI.length; index++) {
        const pointer = TCROI[index];

        if (pointer.type == "line") {
          var linePath = [
            pointer.points.x1,
            pointer.points.y1,
            pointer.points.x2,
            pointer.points.y2,
          ];

          line = new fabric.Line(linePath, {
            stroke: "rgb(127, 255, 0)",
            strokeWidth: 3,
            fill: "rgb(127, 255, 0)",
            originX: "center",
            originY: "center",
            hasControls: false,
            hasBorders: false,
            selectable: false,
            //uuid : this.generateUUID(),trafficCountROIS
            objectCaching: false,
            type: "line",
          });
          temp.push(line);
          line.set({
            x1: Math.round(pointer.points.x1),
            y1: Math.fround(pointer.points.y1),
          });
          this.canvas.add(line);
          // this.activeObj = this.line;
        }
        if (pointer.type == "arrow") {
          var points = [
            pointer.points.x1,
            pointer.points.y1,
            pointer.points.x2,
            pointer.points.y2,
          ];
          line = new fabric.Line(points, {
            strokeWidth: 3,
            fill: "rgb(127, 255, 0)",
            stroke: "rgb(127, 255, 0)",
            originX: "center",
            originY: "center",
            id: "arrow_line",
            selectable: false,
            lockScalingFlip: true,
            objectCaching: false,
            //uuid : this.generateUUID(),
            type: "arrow",
          });

          var centerX = (line.x1 + line.x2) / 2;
          var centerY = (line.y1 + line.y2) / 2;
          this.deltaX = line.left - centerX;
          this.deltaY = line.top - centerY;
          triangle = new fabric.Triangle({
            left: line.get("x2") + this.deltaX,
            top: line.get("y2") + this.deltaY,
            originX: "center",
            originY: "center",
            selectable: false,
            pointType: "arrow_start",
            angle: this._FabricCalcArrowAngle(
              line.x1,
              line.y1,
              line.x2,
              line.y2
            ),
            width: 20,
            height: 20,
            fill: "rgb(127, 255, 0)",
            id: "arrow_triangle",
            uuid: line.uuid,
          });
          temp.push(line, triangle);

          this.canvas.add(line, triangle);
          var text = new fabric.Text(pointer.area_name, {
            fontSize: 16,
            // bottom:5
            backgroundColor: "black",
            selectable: false,
            left: line.left - 60,
            top:
              line.top != 0 && !(line.top - 20 < 0) && line.top - 20 != 0
                ? line.top - 20
                : 20,
            stroke: "rgb(127, 255, 0)",
            fill: "rgb(127, 255, 0)",
          });
          temp.push(text);
          this.canvas.add(text);
          this.canvas.renderAll();
          //this.activeObj = this.line;
        }
      }
      this.canvas.requestRenderAll();

      this.tempTCCanvas[i] = temp;
    });

    this.GetSpillageRoiPoints();
    this.canvas.requestRenderAll();
  }

  DeleteNewTCRoi() {
    this.trafficCountLineROIS.forEach((element: any) => {
      this.canvas.remove(element);
    });
    this.btnIndex = 1;
    this.trafficCountLineROIS = [];
  }
  
  SaveTrafficCountROI() {
    this.TCCanvasData.push(this.line);
    this.TCCanvasData.push(this.triangle);

    this.btnIndex == 1
      ? this.trafficCountLineROIS.push(this.line)
      : this.trafficCountLineROIS.push(this.line, this.triangle);
    if (this.trafficCountLineROIS.length == 1) {
      this.btnIndex = 2;
    }
    if (this.trafficCountLineROIS.length == 3) {
      this.modalService
        .open(this.TCNameModal, { backdrop: "static" })
        .result.then(
          (result) => {
            this.tcName.setValue(null);
            this.tcName.reset();
            this.tcName.addValidators(Validators.required);
            this.classIds = ["person"];
            this.DeleteNewTCRoi();
          },
          (reason) => {}
        );
    }
  }
  

  /*------------------------------------------ Spillage Realted Functions----------------------------------*/

  AddNewSpillageRoi() {
    this.isPolygonDrawn = false;
    this.classIds = ["person"];
    this.polygonOptions.stroke = this.spillageStroke;
    this.newROI.stroke = this.spillageStroke;
    this.isWater = false;
    this.isAddRAROI = false;
    this.isAddParkingROI= false;
    this.isAddTraffic_jamROI = false;
    this.isAddSpillageROI = true;
    this.isEdit = false;
    this.roiType = 1;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
    this.isAddCCROI = false;
  }



  OnAddingSpillageROI() {
    this.isAddRAROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;
    var exist = false;

    // this.cameraData[0].roi_data.forEach((element: any) => {
    //   element.roi_name == this.RAROIName.value ? (exist = true) : (exist = false)
    // });

    if (!exist) {
      if (this.spillageROIName.value !== null) {
        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        this.polygonOptions.stroke = this.spillageStroke;
        var dimensions = this.newROI._calcDimensions();
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ROIName = this.spillageROIName.value;
        if (ROIName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = this.newROIPoints[i].x;

            let tempY = this.newROIPoints[i].y;
            roi_points.push(`${tempX};${tempY};`);
          }
          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ROIName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black",

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: this.spillageStroke,
            fill: this.spillageStroke,
          });
          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          var tempObj: any = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            // roi_id: ROIName,need to check this one
            roi_name: ROIName,
            roi_id: ++this.spillageRoiCount,
            roi_data: {
              bb_box: roiPointsString,
              roi_name: ROIName,
              roi_id: this.spillageRoiCount,
              label_name: this.classIds,
            },
          };
        }
        this.spillageData.push(tempObj);
        this.newROIPoints.splice(0, this.newROIPoints.length);
        this.spillageROIName.setValue(null);
        this.spillageROIName.reset();
        this.spillageROIName.setValidators([Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
        this.classIDPerson.reset();
        this.classIDBike.reset();
        this.classIDCar.reset();
        this.classIDPerson.setValue("person");
        this.classIds = ["person"];

        this.SaveSpillageRoi();
      } else {
        this.classIds = ["person"];

        this.DeleteNewDrawnROI();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }

  SaveSpillageRoi() {
    this.spillageData.length > 0 ? (this.AISolutions.spillage = true) : "";
    //let spillageData:any[]=[this.spillageData[this.spillageData.length-1].roi_data]
    let spillageData: any[] = [];

    this.spillageData.forEach((data: any, index: number) => {
      spillageData.push(data.roi_data);
    });

    var data = {
      id: this.ID,
      spillage_roi_data: spillageData,
      ai_solutions: this.AISolutions,
    };
    this.server.AddSpillageRoi(data).subscribe(
      (response: any) => {
        if (response.success) {
          window.location.reload();
        } else {
          this.server.notification(response.message);
          var tempRoiCanvas = this.spillageData[this.deleteID].roi_canvas;
          var tempTextCanvas = this.spillageData[this.deleteID].roi_name_canvas;
          this.canvas.remove(tempRoiCanvas);
          this.canvas.remove(tempTextCanvas);
          this.canvas.renderAll();
          this.cameraData[0].spillage_roi_data.splice(
            this.spillageData.length - 1,
            1
          );
        }
      },
      (Err) => {
        this.server.notification("Error while the process", "Retry");
        var tempRoiCanvas =
          this.spillageData[this.spillageData.length - 1].roi_canvas;
        var tempTextCanvas =
          this.spillageData[this.spillageData.length - 1].roi_name_canvas;
        this.canvas.remove(tempRoiCanvas);
        this.canvas.remove(tempTextCanvas);
        this.canvas.renderAll();
        this.cameraData[0]?.spillage_roi_data.splice(
          this.spillageData.length - 1,
          1
        );
      }
    );
  }

  GetSpillageRoiPoints() {
    if (this.cameraData[0]?.spillage_roi_data) {
      this.cameraData[0].spillage_roi_data.forEach(
        (points: any, id: number) => {
          var roi_points = points.bb_box.split(";");
          var polyGon: any[] = [];
          for (let i = 0; i < roi_points.length - 1; i = i + 2) {
            var tempPoint = {
              x: Number(roi_points[i]) * this.ratio,
              y: Number(roi_points[i + 1]) * this.ratio,
            };
            polyGon.push(tempPoint);
          }
          var tempObj = { roi: polyGon, roi_name: points.roi_name };
          this.spillageROIPoints.push(tempObj);
          this.spillageRoiCount = points.roi_id;
        }
      );
      this.DrawExistSpillageRois();
    }
  }
  DrawExistSpillageRois() {
    this.spillageROIPoints.forEach((element: any, id: number) => {
      this.polygonOptions.stroke = this.spillageStroke;
      var Polygon = new fabric.Polygon(element.roi, this.polygonOptions);
      var text = new fabric.Text(element.roi_name, {
        fontSize: 20,
        backgroundColor: "black",
        selectable: false,
        left: Polygon.left + 10,
        top: Polygon.top + 50,
        stroke: this.spillageStroke,
        fill: this.spillageStroke,
      });

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_name: this.cameraData[0].spillage_roi_data[id].roi_name,
        roi_data: this.cameraData[0].spillage_roi_data[id],
      };
      // this.alarmSelectedViol[0].roi_key_id.push(element.key_id)
      // this.spillageRoiCount = element.key_id
      this.spillageData.push(tempObj);
      this.canvas.add(Polygon, text);
      this.canvas.requestRenderAll();
      this.canvas.renderAll();
    });
  }

  /*--------------------------------------------- Parking Realted Functions----------------------------------*/
  AddNewParkingRoi() {
    this.isPolygonDrawn = false;

     this.isAddCCROI = false;
     this.isAddRAROI = false;
     this.isAddSpillageROI = false;
     this.isAddParkingROI = true;
     this.isAddTraffic_jamROI = false;
  
    this.polygonOptions.stroke = this.parkingROIColor;
    this.newROI.stroke = this.parkingROIColor;

    this.isWater = false;
    this.isEdit = false;

    this.roiType = 1;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
    
  }

  AlterParkingROIName(id: number) {
    this.isEditText = !this.isEditText;
    this.selectedId = id;
    this.selectedEditId = id;
    this.tempROIID.setValue(this.parkingData[id].roi_name);
    this.modalService.open(this.ParkingROIChangeModal, {
      size: "small",
      animation: true,
      centered: true,
      backdrop: "static",
    });
  }

 

  ChangeParkingROIName() {
    this.parkingData[this.selectedId].roi_name = this.tempROIID.value;

    this.parkingData[this.selectedId].roi_name_canvas.text =
    this.tempROIID.value;
    this.parkingData[this.selectedId].vpms_data.roi_name =
    this.tempROIID.value;
    this.canvas.renderAll();
    this.modalService.dismissAll();
    this.SaveEditedParkingRoi();
  }
  

  ParkingROINameSumbit(){

    this.modalService.dismissAll();
    this.OnAddingParkingNewROI();
  }


  OnAddingParkingNewROI() {
    this.isAddParkingROI = false;
    
    var exist = false;

    (this.cameraData?.[0] && (this.cameraData[0].vpms_data)) ?
    this.cameraData[0].vpms_data.forEach((element: any) => {
      element.roi_name == this.parkingROIName.value
        ? (exist = true)
        : (exist = false);
    }):(exist = false)


    if (!exist) {
      if (this.parkingROIName.value !== null) {
        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        this.polygonOptions.stroke = this.parkingROIColor;
        var dimensions = this.newROI._calcDimensions();
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ROIName = this.parkingROIName.value;
        if (ROIName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = this.newROIPoints[i].x;

            let tempY = this.newROIPoints[i].y;
            roi_points.push(`${tempX};${tempY};`);
          }
          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ROIName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black", 

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: this.parkingROIColor,
            fill: this.parkingROIColor,
          });
          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          var tempObj: any = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            // roi_id: ROIName,need to check this one
            roi_name: ROIName,
            roi_id: this.parkingData.length - 1,
            
              vpms_data:{
              bb_box: roiPointsString,
              roi_name: ROIName,
              roi_id: this.parkingData.length - 1,
              
              alarm_type: {
                hooter: null,
                relay: null,
              },
              alarm_ip_address: {
                hooter_ip: null,
                relay_ip: null,
              },
              selected_objects:this.selectedObjects,
              other_objects_violation:{
                violation:this.isOtherObjectsViolation?this.isOtherObjectsViolation:null,
                violation_objects:this.isOtherObjectsViolation==='yes'?this.getViolationObjects(this.selectedObjects):null
              },
            set_time_option:this.isSetTime?this.isSetTime:null,
            date:{
              startDate:this.selectedTime? this.selectedTime.startDate.format("HH:mm:ss"):null,
              endDate:this.selectedTime?this.selectedTime?.endDate.format("HH:mm:ss"):null
            },
            other_time_violation:this.isOtherTimeViolation?this.isOtherTimeViolation:null,
            parking_type:this.isAddParkingROI?'no-parking':'parking'

      },


              
            
    };
          if (this.cameraData[0].alarm_type.hooter) {
            (tempObj.vpms_data["alarm_type"]["hooter"] = this.isAddHooter.value),
              (tempObj.vpms_data["alarm_ip_address"]["hooter_ip"] =
                this.cameraData[0].alarm_ip_address.hooter_ip);
          }
          if (this.cameraData[0]?.alarm_type?.relay) {
            tempObj.vpms_data["alarm_type"]["relay"] = this.isAddRelay.value;
            tempObj.vpms_data["alarm_ip_address"]["relay_ip"] =
              this.cameraData[0].alarm_ip_address.relay_ip;
              this.cameraData[0].alarm_version.relay=='type3'?tempObj.vpms_data["alarm_type"].channel=this.selectedChannel? this.selectedChannel.data:1:''
          }
        }

        this.parkingData.push(tempObj);
       
        this.newROIPoints.splice(0, this.newROIPoints.length);
        
        this.parkingROIName.reset();

        this.SaveParkingROI();
      } else {
       
        this.DeleteNewDrawnROI();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.selectedObjects = [];
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }

  SaveParkingROI() {
    // var crowd_Data: any[] = [];
    // var crowdCountData: any[] = [];
    // if (this.CCData.length > 0) {
    //   this.CCData.forEach((element) => {
    //     crowdCountData.push(element.cr_data);
    //   });
    // }
    // if (
    //   this.peopleCrowdForm.get("min").value ||
    //   this.peopleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "people",
    //     min_count: this.peopleCrowdForm.get("min").value
    //       ? this.peopleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.peopleCrowdForm.get("max").value
    //       ? this.peopleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }
    // if (
    //   this.vehicleCrowdForm.get("min").value ||
    //   this.vehicleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "vehicle",
    //     min_count: this.vehicleCrowdForm.get("min").value
    //       ? this.vehicleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.vehicleCrowdForm.get("max").value
    //       ? this.vehicleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }

    var roiData: any[] = [];
    
    this.parkingData.forEach((element: any, id: number) => {
      roiData.push({ ...element.vpms_data,roi_id: id + 1 });
    });

    roiData.length > 0
      ? (this.AISolutions.Parking = true)
      : (this.AISolutions.Parking = false);

    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      vpms_data:roiData
    };

    this.server.AddParkingROI(cameraData).subscribe(
      (response: any) => {
        // this.isLoading = false;
        if (response.success) {
           window.location.reload();
          this.server.CameraSettingsChanges.next(true);
          this.server.notification(response.message);
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        // this.isLoading = false;
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }


  no_parkingNameSumbit(){

    this.modalService.dismissAll();
     this.OnAddingNo_ParkingNewROI();
  }


  OnAddingNo_ParkingNewROI() {
    
    this.isAddParkingROI = false;
   
    var exist = false;
    this.isNo_Parking = true;

    (this.cameraData?.[0] && (this.cameraData[0].vpms_data ))?
     this.cameraData[0].vpms_data.forEach((element: any) => {
      element.roi_name == this.no_parkingROIName.value
        ? (exist = true)
        : (exist = false);
    }):(exist = false)

    if (!exist) {
      if (this.no_parkingROIName.value !== null) {
        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        this.polygonOptions.stroke = this.parkingROIColor;
        var dimensions = this.newROI._calcDimensions();
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ROIName = this.no_parkingROIName.value;
        if (ROIName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = this.newROIPoints[i].x;

            let tempY = this.newROIPoints[i].y;
            roi_points.push(`${tempX};${tempY};`);
          }
          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ROIName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black",

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: this.parkingROIColor,
            fill: this.parkingROIColor,
          });
          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          var tempObj: any = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            // roi_id: ROIName,need to check this one
            roi_name: ROIName,
            roi_id: this.parkingData.length - 1,
              vpms_data:{
              bb_box: roiPointsString,
              roi_name: ROIName,
              roi_id: this.parkingData.length - 1,
              
              alarm_type: {
                hooter: null,
                relay: null,
              },
              alarm_ip_address: {
                hooter_ip: null,
                relay_ip: null,
              },
              selected_objects:[],
            other_objects_violation:null,
            set_time_option:null,
            date:null,
            other_time_violation:null,
            parking_type:this.isNo_Parking?'no-parking':'parking'

      },


              
           
    };
          if (this.cameraData[0].alarm_type.hooter) {
            (tempObj.vpms_data["alarm_type"]["hooter"] = this.isAddHooter.value),
              (tempObj.vpms_data["alarm_ip_address"]["hooter_ip"] =
                this.cameraData[0].alarm_ip_address.hooter_ip);
          }
          if (this.cameraData[0]?.alarm_type?.relay) {
            tempObj.vpms_data["alarm_type"]["relay"] = this.isAddRelay.value;
            tempObj.vpms_data["alarm_ip_address"]["relay_ip"] =
              this.cameraData[0].alarm_ip_address.relay_ip;
              this.cameraData[0].alarm_version.relay=='type3'?tempObj.vpms_data["alarm_type"].channel=this.selectedChannel? this.selectedChannel.data:1:''
          }
        }

        this.parkingData.push(tempObj);
        
        this.newROIPoints.splice(0, this.newROIPoints.length);
        
        this.no_parkingROIName.reset();
        
        this.SaveParkingROI();
      } else {
        this.DeleteNewDrawnROI();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.selectedObjects = []
      this.modalService.dismissAll();
      this.server.notification("The ROI of this name already exist", "retry");
    }

  }

  GetParkingPoints() {
    this.cameraData[0]?.vpms_data?.forEach((points: any, id: number) => {
      var roi_points = points.bb_box.split(";");
    (this.cameraData[0] && this.cameraData[0]?.vpms_data.selected_objects)?
      this.parkingObjects.push(...points.selected_objects):this.parkingObjects
      // console.log(this.parkingObjects,'this is parking objects from the getparkingpoints')
      var polyGon: any[] = [];
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio,
        };
        polyGon.push(tempPoint);
      }
      var tempObj = {
        roi: polyGon,
        roi_name: points.roi_name,
      };
      this.parkingROIPoints.push(tempObj);
    });
    this.parkingObjects = this.RemoveDuplicates(this.parkingObjects);

    // this.GetCCRoiPoints();

    // this.DrawExistPanels();
    // console.log('this is from the getparkingpoints',this .parkingROIPoints)
   this. DrawExistParkingROIs();
  }

  DrawExistParkingROIs() {
    // console.log('this is parkingpoints variable form the drawexistparkingrois',this.parkingData)
    this.parkingROIPoints.forEach((element: any, id: number) => {
      this.polygonOptions.stroke = this.parkingROIColor;
      var Polygon = new fabric.Polygon(element.roi, this.polygonOptions);
      var text = new fabric.Text(element.roi_name, {
        fontSize: 20,
        backgroundColor: "black",
        selectable: false,
        left: Polygon.left + 10,
        top: Polygon.top + 50,
        stroke: this.parkingROIColor,
        fill: this.parkingROIColor,
      });

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_name: this.cameraData[0].vpms_data[id].roi_name,
        vpms_data: this.cameraData[0].vpms_data[id],
        alarm_type: this.cameraData[0].vpms_data[id].alarm_type,
        alarm_ip_address: this.cameraData[0].vpms_data[id].alarm_type,
      };
      this.alarmSelectedViol[0].roi_key_id.push(element.key_id);
      this.parkingKeyId = element.key_id;
      this.parkingData.push(tempObj);
      // console.log('this is all camera data from the drawexisting parking rois',this.allCameraData)
      this.canvas.add(Polygon, text);
      this.canvas.renderAll();
    });
  }

  SaveEditedParkingRoi() {
  
    
    var roiData: any[] = [];

    var roi_points: any[] = [];
    if (this.selectedEditId != null) {
      for (
        let i = 0;
        i < this.parkingData[this.selectedEditId].roi_canvas.points.length;
        i++
      ) {
        var points = this.parkingData[this.selectedEditId].roi_canvas.points;
        let tempX = Math.round(points[i].x);

        let tempY = Math.round(points[i].y);
        roi_points.push(`${tempX};${tempY};`);
      }
      //to remove the ,
      var comma = /,/g;
      var roiPointsString = roi_points.toString().replace(comma, "");

      this.parkingData[this.selectedEditId].vpms_data.bb_box = roiPointsString;

      roiData.push({ ...this.parkingData[this.selectedEditId].vpms_data });
    }
    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      // imagename: this.imageName,
      vpms_data: roiData,
      roi_id: this.parkingData[this.selectedEditId].vpms_data.roi_id,
      // ppe_data: [this.PPEConfig],
    };
    this.server.EditParkingROI(cameraData).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
           window.location.reload();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  getViolationObjects(selectedObjects:any) {
    const violationObjects = [];
    for (const vehicle of this.vehicles_List) {
      if (!selectedObjects.includes(vehicle)) {
        violationObjects.push(vehicle);
      }
    }
    return violationObjects;
  }

 


  /*--------------------------------------------- Traffic-Jam Related Functions----------------------------*/
  AddNewTraffic_JamRoi() {
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = true;
    this.isPolygonDrawn = false;
    // this.classIds = ["person"];
    this.polygonOptions.stroke = this.traffic_jamROIColor;
    this.newROI.stroke = this.traffic_jamROIColor;
    this.isWater = false;
    this.isAddRAROI = false;
    this.isAddSpillageROI = false;
    this.isEdit = false;
    this.roiType = 1;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
    this.isAddCCROI = false;
  }

  AlterTraffic_JamROIName(id: number) {
    this.isEditText = !this.isEditText;
    this.selectedId = id;
    this.selectedEditId = id;
    this.tempROIID.setValue(this.traffic_jamData[id].roi_name);
    this.modalService.open(this.Traffic_JamROIChangeModal, {
      size: "small",
      animation: true,
      centered: true,
      backdrop: "static",
    });
  }

  ChangeTraffic_JamROIName() {
    this.traffic_jamData[this.selectedId].roi_name = this.tempROIID.value;

    this.traffic_jamData[this.selectedId].roi_name_canvas.text =
    this.tempROIID.value;
    this.traffic_jamData[this.selectedId].trafficjam_data.roi_name =
    this.tempROIID.value;
    this.canvas.renderAll();
    this.modalService.dismissAll();
    this.SaveEditedTraffic_JamRoi();
  }
  Traffic_JamNameSumbit(){

    this.modalService.dismissAll();

   
     this.OnAddingTraffic_jamNewROI();
  }



  // AddNewArrow() {
  //   this.classIds = ["person"];
  //   this.isWater = false;
  //   this.roiType = 2;
  //   this.btnIndex = 2;
  //   this.isEdit = false;
  // }


  OnAddingTraffic_jamNewROI() {
    this.isAddRAROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;
    var exist = false;

    (this.cameraData?.[0] && (this.cameraData[0].trafficjam_data ))?this.cameraData[0].trafficjam_data.forEach((element: any) => {
      element.roi_name == this.traffic_jamROIName.value
        ? (exist = true)
        : (exist = false);
    }):(exist = false)

    if (!exist) {
      if (this.traffic_jamROIName.value !== null) {
        fabric.util.resetObjectTransform(this.newROI);
        var roi_points: any[] = [];
        const tempPoints = [...this.newROIPoints];
        this.polygonOptions.stroke = this.traffic_jamROIColor;
        var dimensions = this.newROI._calcDimensions();
        const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
        var ROIName = this.traffic_jamROIName.value;
        if (ROIName !== null) {
          this.isChanges = true;
          this.canvas.add(currentROI);
          this.canvas.renderAll();
          for (let i = 0; i < this.newROIPoints.length; i++) {
            let tempX = this.newROIPoints[i].x;

            let tempY = this.newROIPoints[i].y;
            roi_points.push(`${tempX};${tempY};`);
          }
          //to remove the ,
          var comma = /,/g;
          var roiPointsString = roi_points.toString().replace(comma, "");
          var ROINameObject = new fabric.Text(ROIName, {
            fontSize: 20,
            // bottom:5
            backgroundColor: "black",

            selectable: false,
            left: dimensions.left,
            top: dimensions.top - 20,
            stroke: this.traffic_jamROIColor,
            fill: this.traffic_jamROIColor,
          });
          this.canvas.add(ROINameObject);
          this.canvas.renderAll();

          var tempObj: any = {
            roi_name_canvas: ROINameObject,
            roi_canvas: currentROI,
            // roi_id: ROIName,need to check this one
            roi_name: ROIName,
            roi_id: this.traffic_jamData.length - 1,
            // roi_data: {
              // bb_box: roiPointsString,
              // roi_name: ROIName,
              // roi_id: this.allCameraData.length - 1,
              // label_name: this.classIds,
              // alarm_type: {
              //   hooter: null,
              //   relay: null,
              // },
              // alarm_ip_address: {
              //   hooter_ip: null,
              //   relay_ip: null,
              // },

              trafficjam_data:{
              bb_box: roiPointsString,
              roi_name: ROIName,
               roi_id: this.traffic_jamData.length - 1,
              // label_name: this.classIds,
              alarm_type: {
                hooter: null,
                relay: null,
              },
              alarm_ip_address: {
                hooter_ip: null,
                relay_ip: null,
              },
              selected_objects:this.selectedObjects,
      // other_objects_violation:this.isOtherObjectsViolation,
      // set_time_option:this.isSetTime,
      // date:{startDate:this.selectedTime?.startDate.format("YYYY-MM-DD HH:mm:ss"),
      // endDate:this.selectedTime?.endDate.format("YYYY-MM-DD HH:mm:ss")},
      // other_time_violation:this.isOtherTimeViolation,
      // parking_type:this.isAddParkingROI?'no-parking':'parking'

      // min_time:(this.cameraData?.[0] && (!this.cameraData[0].trafficjam_data || this.cameraData[0].trafficjam_data.length <= 0) ) ? this.minimumTime.minute: this.cameraData[0].trafficjam_data[0].min_time,
      min_time:this.minimumTime.minute,

      traffic_jam_percentage:this.traffic_jamPercentage

      },


              
            // },
    };
          if (this.cameraData[0].alarm_type.hooter) {
            (tempObj.trafficjam_data["alarm_type"]["hooter"] = this.isAddHooter.value),
              (tempObj.trafficjam_data["alarm_ip_address"]["hooter_ip"] =
                this.cameraData[0].alarm_ip_address.hooter_ip);
          }
          if (this.cameraData[0]?.alarm_type?.relay) {
            tempObj.trafficjam_data["alarm_type"]["relay"] = this.isAddRelay.value;
            tempObj.trafficjam_data["alarm_ip_address"]["relay_ip"] =
              this.cameraData[0].alarm_ip_address.relay_ip;
              this.cameraData[0].alarm_version.relay=='type3'?tempObj.trafficjam_data["alarm_type"].channel=this.selectedChannel? this.selectedChannel.data:1:''
          }
        }

        this.traffic_jamData.push(tempObj);
        // console.log('this is parkingData from the onaddingparkingrois',this.parkingData)
        this.newROIPoints.splice(0, this.newROIPoints.length);
        this.traffic_jamROIName.setValue(null);
        this.traffic_jamROIName.reset();
        this.traffic_jamROIName.setValidators([Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))]);
        this.classIDPerson.reset();
        this.classIDBike.reset();
        this.classIDCar.reset();
        this.classIDPerson.setValue("person");
        this.classIds = ["person"];

        this.SaveTraffic_JamROI();
      } else {
        this.classIds = ["person"];

        this.DeleteNewDrawnROI();
      }
    } else {
      this.DeleteNewDrawnROI();
      this.modalService.dismissAll();
      this.selectedObjects = []
      this.server.notification("The ROI of this name already exist", "retry");
    }
  }


  SaveTraffic_JamROI() {
    // var crowd_Data: any[] = [];
    // var crowdCountData: any[] = [];
    // if (this.CCData.length > 0) {
    //   this.CCData.forEach((element) => {
    //     crowdCountData.push(element.cr_data);
    //   });
    // }
    // if (
    //   this.peopleCrowdForm.get("min").value ||
    //   this.peopleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "people",
    //     min_count: this.peopleCrowdForm.get("min").value
    //       ? this.peopleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.peopleCrowdForm.get("max").value
    //       ? this.peopleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }
    // if (
    //   this.vehicleCrowdForm.get("min").value ||
    //   this.vehicleCrowdForm.get("max").value
    // ) {
    //   var crowTemp = {
    //     label_name: "vehicle",
    //     min_count: this.vehicleCrowdForm.get("min").value
    //       ? this.vehicleCrowdForm.get("min").value
    //       : 0,
    //     max_count: this.vehicleCrowdForm.get("max").value
    //       ? this.vehicleCrowdForm.get("max").value
    //       : 0,
    //   };
    //   this.crowdConfig.push(crowTemp);
    // }

    var roiData: any[] = [];
    // console.log('this is parkingData',this.parkingData)
    this.traffic_jamData.forEach((element: any, id: number) => {
      roiData.push({ ...element.trafficjam_data,roi_id: id + 1 });
    });

    roiData.length > 0
      ? (this.AISolutions.Traffic_Jam = true)
      : (this.AISolutions.Traffic_Jam = false);

    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      // vpms_data:[{
      //   // imagename: this.imageName,
        
      // selected_objects:this.selectedObjects,
      // other_objects_violation:this.isOtherObjectsViolation,
      // set_time_option:this.isSetTime,
      // date:{startDate:this.selectedTime?.startDate?.$d,
      // endDate:this.selectedTime?.endDate?.$d},
      // other_time_violation:this.isOtherTimeViolation,
      // parking_type:this.isAddParkingROI?'parking':'no-parking'
      // }]
      trafficjam_data:roiData
     
      // tc_data: this.trafficCountData,
      // ppe_data: [this.PPEConfig],
      // cr_data: crowdCountData,
      //edited
      // fire_smoke_data: [
      //   {
      //     fire: this.fireSmokeDustForm.get("fire").value,
      //     smoke: this.fireSmokeDustForm.get("smoke").value,
      //     dust: this.fireSmokeDustForm.get("dust").value,
      //     water: this.fireSmokeDustForm.get("water").value,
      //   },
      // ],

      // roi_name:this.RAROIName.value,
      



    };


    

    this.server.AddTraffic_JamROI(cameraData).subscribe(
      (response: any) => {
        // this.isLoading = false;
        if (response.success) {
           window.location.reload();
          this.server.CameraSettingsChanges.next(true);
          this.server.notification(response.message);
          console.log('this is from the addtrafficjamroi',cameraData)
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        // this.isLoading = false;
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  GetTraffic_JamPoints() {
    this.cameraData[0]?.trafficjam_data?.forEach((points: any, id: number) => {
      var roi_points = points.bb_box.split(";");
      this.traffic_jamObjects.push(...points.selected_objects);
      var polyGon: any[] = [];
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio,
        };
        polyGon.push(tempPoint);
      }
      var tempObj = {
        roi: polyGon,
        roi_name: points.roi_name,
      };
      this.traffic_jamROIPoints.push(tempObj);
    });
    this.traffic_jamObjects = this.RemoveDuplicates(this.traffic_jamObjects);

    // this.GetCCRoiPoints();

    // this.DrawExistPanels();
    // console.log('this is from the getparkingpoints',this .parkingROIPoints)
   this. DrawExistTraffic_JamROIs();
  }

  DrawExistTraffic_JamROIs() {
    // console.log('this is parkingpoints variable form the drawexistparkingrois',this.parkingData)
    this.traffic_jamROIPoints.forEach((element: any, id: number) => {
      this.polygonOptions.stroke = this.traffic_jamROIColor;
      var Polygon = new fabric.Polygon(element.roi, this.polygonOptions);
      var text = new fabric.Text(element.roi_name, {
        fontSize: 20,
        backgroundColor: "black",
        selectable: false,
        left: Polygon.left + 10,
        top: Polygon.top + 50,
        stroke: this.traffic_jamROIColor,
        fill: this.traffic_jamROIColor,
      });

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_name: this.cameraData[0].trafficjam_data[id].roi_name,
        trafficjam_data: this.cameraData[0].trafficjam_data[id],
        alarm_type: this.cameraData[0].trafficjam_data[id].alarm_type,
        alarm_ip_address: this.cameraData[0].trafficjam_data[id].alarm_type,
      };
      this.alarmSelectedViol[0].roi_key_id.push(element.key_id);
      this.traffic_jamKeyId = element.key_id;
      this.traffic_jamData.push(tempObj);
      // console.log('this is all camera data from the drawexisting parking rois',this.allCameraData)
      this.canvas.add(Polygon, text);
      this.canvas.renderAll();
    });
  }
  SaveEditedTraffic_JamRoi() {
  
    
    var roiData: any[] = [];

    var roi_points: any[] = [];
    if (this.selectedEditId != null) {
      for (
        let i = 0;
        i < this.traffic_jamData[this.selectedEditId].roi_canvas.points.length;
        i++
      ) {
        var points = this.traffic_jamData[this.selectedEditId].roi_canvas.points;
        let tempX = Math.round(points[i].x);

        let tempY = Math.round(points[i].y);
        roi_points.push(`${tempX};${tempY};`);
      }
      //to remove the ,
      var comma = /,/g;
      var roiPointsString = roi_points.toString().replace(comma, "");

      this.traffic_jamData[this.selectedEditId].trafficjam_data.bb_box = roiPointsString;

      roiData.push({ ...this.traffic_jamData[this.selectedEditId].trafficjam_data });
    }
    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      // imagename: this.imageName,
      trafficjam_data: roiData,
      roi_id: this.traffic_jamData[this.selectedEditId].trafficjam_data.roi_id,
      // ppe_data: [this.PPEConfig],
    };
    this.server.EditTraffic_JamROI(cameraData).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
           window.location.reload();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }


 /*------------------------------ Personal Protective Equipment (PPE) realted Functions--------------------*/

  PPE_Config(event: any) {
    if (event.target.checked) {
      if (event.target.value === "helmet") {
        this.isEdit = true;
        this.PPEConfig.helmet = true;
      }
      if (event.target.value === "vest") {
        this.isEdit = true;
        this.PPEConfig.vest = true;
      }
    } else {
      this.isEdit = true;
      if (event.target.value === "helmet") {
        this.PPEConfig.helmet = false;
      }
      if (event.target.value === "vest") {
        this.PPEConfig.vest = false;
      }
    }
    this.savePpeConfig();
  }

  savePpeConfig() {
    this.PPEConfig.helmet || this.PPEConfig.vest
      ? (this.AISolutions.PPE = true)
      : (this.AISolutions.PPE = false);
    var roiData: any[] = [];
    this.allCameraData.forEach((element: any, id: number) => {
      roiData.push({ ...element.roi_data, roi_id: id + 1 });
    });
    var cameraData: any = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      imagename: this.imageName,
      roi_data: roiData,
      tc_data: this.TCData,
      ppe_data: [this.PPEConfig],
      cr_data: this.crowdConfig,
      //edited
      fire_smoke_data: [
        {
          fire: this.fireSmokeDustForm.get("fire").value,
          smoke: this.fireSmokeDustForm.get("smoke").value,
          dust: this.fireSmokeDustForm.get("dust").value,
        },
      ],
    };

    this.server.AddROI(cameraData).subscribe(
      (response: any) => {
        // this.isLoading = false;
        if (response.success) {
          this.server.CameraSettingsChanges.next(true);

          this.server.notification(response.message);
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        // this.isLoading = false;
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

 

 


  /*--------------------------------------------- Fire Smoke Dust Related Functions-------------------------*/

  AddSensgizData() {
    this.sensgiz.push(
      new FormGroup({
        coinLocation: new FormControl("", [Validators.required]),
        presetId: new FormControl("", [
          Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
          Validators.min(0),
          Validators.required,
        ]),
      })
    );
  }

  DeleteSensgizData(i: number) {
    this.sensgiz.controls.splice(i, 1);
    this.sensgiz.updateValueAndValidity();
  }

  AddFireSmokeSolution() {
    this.SensGizInfo = [];

    this.sensgiz.controls.forEach((element: any, index: number) => {
      this.SensGizInfo.push({
        presetid: element.value["presetId"],
        presetlocation: element.value["coinLocation"],
        preset_key_id: index,
      });
    });
    this.fireSmokeDustForm.get("fire").value ? (this.AISolutions.fire = true) : "";

    this.fireSmokeDustForm.get("smoke").value
      ? (this.AISolutions.smoke = true)
      : "";
    this.fireSmokeDustForm.get("dust").value ? (this.AISolutions.dust = true) : "";
    var fireAndSmokeData = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      firesmoke_data: [
        {
          fire: this.fireSmokeDustForm.get("fire").value,
          smoke: this.fireSmokeDustForm.get("smoke").value,
          dust: this.fireSmokeDustForm.get("dust").value,
          camera_type: this.cameraType.value,
          presets: [...this.SensGizInfo],
        },
      ],
    };
    this.server.AddFireSmokeToFrame(fireAndSmokeData).subscribe(
      (response: any) => {
        this.server.notification(response.message);
        window.location.reload();
        if (response.success) {
        }
      },
      (Err) => {
        window.location.reload();
      }
    );
  }


  AddFireROI() {
    this.polygonOptions.stroke = "orange";
    this.newROI.stroke = "orange";

    this.isAddRAROI = false;
    this.isAddParkingROI = false;
    this.isAddTraffic_jamROI = false;
    this.isWater = true;
    this.isEdit = false;
    this.roiType = 1;
    this.isTCRoi = false;
    this.newROIPoints.splice(0, this.newROIPoints.length);
    this.canvas.requestRenderAll();
    this.isAddCCROI = false;
  }


  DeleteFireSmokeFrame() {
    this.AISolutions.fire = false;
    this.AISolutions.smoke = false;
    this.AISolutions.dust = false;
    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
    };

    this.server.DeleteFireSmokeFrame(data).subscribe(
      (response: any) => {
        window.location.reload();
        this.server.notification(response.message);
      },
      (Err) => {
        window.location.reload();
        this.server.notification("Error During the Process", "Retry");
      }
    );
  }
  /*--------------------------------------- Alarm Related Functions----------------------------------------*/

  EditAlert(modal: any) {
    this.sensgiz.reset();
    this.sensgiz = new FormArray([]);

    this.sensgiz.push(
      new FormGroup({
        coinLocation: new FormControl("", [Validators.required]),
        presetId: new FormControl("", [
          Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
          Validators.min(0),
          Validators.required,
        ]),
      })
    );
    this.editAlertForm
      .get("alarmEnable")
      .setValue(this.cameraData[0].alarm_enable);
    if (this.cameraData[0].alarm_type == "hooter") {
      this.isHooter = true;
      this.isRelay = false;
      this.isSensgiz = false;
      this.editAlertForm.get("alarmType").setValue("hooter");
      this.editAlertForm
        .get("alarmIp")
        .setValue(this.cameraData[0].alarm_ip_address);
    } else if (this.cameraData[0].alarm_type == "relay") {
      this.isHooter = false;
      this.isRelay = true;
      this.isSensgiz = false;
      this.editAlertForm.get("alarmType").setValue("relay");
      this.editAlertForm
        .get("alarmIp")
        .setValue(this.cameraData[0].alarm_ip_address);
    } else if (this.cameraData[0].alarm_type == "sensegiz") {
      this.sensgiz = new FormArray([]);
      this.SensGizInfo = this.cameraData[0].coin_details;
      this.isHooter = false;
      this.isRelay = false;
      this.isSensgiz = true;

      this.cameraData[0].coin_details.forEach((value: any, index: number) => {
        this.sensgiz.push(
          new FormGroup({
            coinLocation: new FormControl("", [Validators.required]),
            presetId: new FormControl("", [
              Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
              Validators.min(0),
              Validators.required,
            ]),
          })
        );

        this.sensgiz.controls[index]
          .get("coinLocation")
          .setValue(value.coin_location);
        this.sensgiz.controls[index].get("presetId").setValue(value.preset_id);
      });
      this.editAlertForm.get("alarmType").setValue("sensegiz");
    } else {
    }

    this.modalService.open(modal).result.then(
      (result) => {
        this.responseMessage = "";
      },
      (reason) => {
        this.responseMessage = "";
      }
    );
  }

  OnAlarmAISelect(event: any) {
    if (event.target.checked) {
      this.AlarmAITypes.push(event.target.value);
      event.target.value == "RA"
        ? (this.alarmRAObjects.get("person").setValue(true),
          (this.alarmSelectedViol[0].alarm = true))
        : "";
      event.target.value == "PPE"
        ? (this.alarmPPEObjects.get("helmet").setValue("helmet"),
          this.alarmPPEObjects.get("vest").setValue("vest"),
          (this.alarmSelectedViol[1].alarm = true))
        : "";
    } else {
      event.target.defaultValue == "RA"
        ? (this.alarmSelectedViol[0].alarm = false)
        : "";
      event.target.defaultValue == "PPE"
        ? (this.alarmSelectedViol[1].alarm = false)
        : "";

      var index = this.AlarmAITypes.indexOf(event.target.defaultValue);
      this.AlarmAITypes.splice(index, 1);
    }
  }

  OnRAAlarmObjects(event: any) {
    if (event.target.checked) {
      this.raAlarmObjects.push(event.target.value);
    } else {
      var index = this.raAlarmObjects.indexOf(event.target.defaultValue);
      this.raAlarmObjects.splice(index, 1);
    }
    this.alarmSelectedViol[0].classes = [...this.raAlarmObjects];
  }

  OnAlarmRAROISelect(event: any) {
    if (event.target.checked) {
      this.alarmSelectedViol[0].roi_key_id.push(event.target.value);
    } else {
      var index = this.alarmSelectedViol[0].roi_key_id.indexOf(
        event.target.defaultValue
      );
      this.alarmSelectedViol[0].roi_key_id.splice(index, 1);
    }
  }


  OnPPEAlarmObjects(event: any) {
    if (event.target.checked) {
      this.ppeAlarmObjects.push(event.target.value);
    } else {
      var index = this.ppeAlarmObjects.indexOf(event.target.defaultValue);
      this.ppeAlarmObjects.splice(index, 1);
    }

    this.alarmSelectedViol[1].classes = [...this.ppeAlarmObjects];
  }

  GetAlertInfo() {
    this.server.GetRACameraData(this.ID).subscribe((response: any) => {
      this.cameraData = response.message;
      this.AISolutions = this.cameraData[0].ai_solution
        ? this.cameraData[0].ai_solution
        : {};
      this.currentArea = response.area;
      this.currentPlant = response.plant;
      this.CameraDataObservable = of(response.message);
      this.isCameraData = true;

      if (this.cameraData[0].ppe_data.length > 0) {
        this.PPEForm.get("helmet").valueChanges.subscribe((value: any) => {});
        this.PPEConfig = this.cameraData[0].ppe_data[0];
        if (this.cameraData[0].ppe_data[0].helmet) {
          //this.PPEForm.get('helmet').
          this.PPEForm.get("helmet").setValue(true);
          this.PPEForm.get("helmet").markAsUntouched();
        } else {
          this.PPEForm.get("helmet").setValue(false);
        }
        if (this.cameraData[0].ppe_data[0].vest) {
          this.PPEForm.get("vest").setValue(true);
        } else {
          this.PPEForm.get("vest").setValue(false);
        }
      } else {
        this.PPEForm.get("vest").setValue(false);
        this.PPEForm.get("helmet").setValue(false);
      }
    });
  }


 


  

  


  
  

 

  


  hooterOrRelayConfig(event: any, modal?: any) {
    if (event.target.value == "hooter") {
      this.isHooter = true;
      this.isRelay = false;
      this.isSensgiz = false;
      this.isVoiceAlert = false;
    } else if (event.target.value == "relay") {
      this.isHooter = false;
      this.isRelay = true;
      this.isSensgiz = false;
      this.isVoiceAlert = false;
    } else if (event.target.value == "voiceAlert") {
      this.isVoiceAlert = true;
      this.isHooter = false;
      this.isRelay = false;
      this.isSensgiz = false;
    } else if (event.target.value == "sensegiz") {
      this.isVoiceAlert = false;
      this.isSensgiz = true;
      this.isHooter = false;
      this.isRelay = false;
      this.SensgizModal(modal);
    } else {
      this.isVoiceAlert = false;
      this.isSensgiz = false;
      this.isHooter = false;
      this.isRelay = false;
    }
  }

  OnEditAlertDetails() {
    this.responseMessage = "";
    // this.AddCameraForm.get('rtsp_url').value?this.removeValidators():''
    this.editAlertForm.updateValueAndValidity();
    if (true) {
      // this.isLoading = true;
      var formData = new FormData();
      this.isFail = false;
      this.isSuccess = false;

      var ai_solution = Array;
      if (this.isHooter) {
        var data1: any = {
          id: this.cameraData[0]._id.$oid,
          alarm_type: "hooter",

          alarm_ip_address: this.editAlertForm.value["alarmIp"],
          alarm_enable: this.editAlertForm.get("alarmEnable").value,
        };
      } else if (this.isRelay) {
        var data1: any = {
          id: this.cameraData[0]._id.$oid,
          alarm_type: "relay",
          alarm_ip_address: this.editAlertForm.value["alarmIp"],
          alarm_enable: this.editAlertForm.value["alarmEnable"],
        };
      }
      //altered
      else if (this.isVoiceAlert) {
        var data1: any = {
          id: this.cameraData[0]._id.$oid,

          alarm_type: "voiceAlert",

          alarm_ip_address: this.editAlertForm.value["voiceLanguage"],
          alarm_enable: this.editAlertForm.get("alarmEnable").value,
        };
      } else if (this.isSensgiz) {
        var data1: any = {
          id: this.cameraData[0]._id.$oid,

          alarm_type: "sensegiz",

          coin_details: this.SensGizInfo,
          alarm_enable: this.editAlertForm.get("alarmEnable").value,
        };
      } else {
        var data1: any = {
          id: this.cameraData[0]._id.$oid,

          ai_solution: this.AISolutions,
          alarm_type: null,
          alarm_enable: false,

          alarm_ip_address: null,
        };
      }

      this.server.EditAlarm(data1).subscribe(
        (response: any) => {
          if (response.success) {
            // this.isLoading = false;
            this.isSuccess = true;
            this.GetAlertInfo();
            this.responseMessage = response.message;
            this.responseMessage = "";
            this.isHooter = false;
            this.isRelay = false;
            this.server.notification(response.message);
            setTimeout(() => {
              this.modalService.dismissAll();
            }, 500);
            // this.GetCameraList()
          } else {
            // this.isLoading = false;
            this.responseMessage = response.message;
            this.isFail = true;
          }
        },
        (Err) => {
          this.isFail = true;
          this.responseMessage = "Error while adding camera,retry";
          // this.isLoading = false;
        }
      );

      // }
    }
  }

  SaveSensgizInfo() {
    this.SensGizInfo = [];
    this.sensgiz.controls.forEach((element: any, index: number) => {
      this.SensGizInfo.push({
        preset_id: element.value["presetId"],
        coin_location: element.value["coinLocation"],
        coin_key_id: index,
      });
    });
    if (this.editAlertForm.get("alarmType").value == "sensegiz") {
      if (
        this.editAlertForm.get("alarmType").value != null &&
        this.editAlertForm.get("alarmIp").value != "" &&
        this.sensgiz.length > 0
      ) {
        this.isAlertFormValid = true;
      }
    }
    this.sensgizModal.close();
    this.editAlertForm.updateValueAndValidity();
  }

  datesUpdated(dateEvent: any) {
    this.selectedTime = dateEvent
    // console.log(dateEvent,"this is date event from the datesupdated function")

  }

  RefreshCameraData() {
    this.server.GetRACameraData(this.ID).subscribe((response: any) => {
      if (response.success) {
        this.cameraData = response.message;
        this.trafficCountData = this.cameraData[0].tc_data;
      }
    });
  }
 

  RemoveDuplicates(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  

  

  

  DeleteWaterROIS(i: number) {
    this.canvas.remove(this.WaterROIData[i].roi_canvas);
    this.canvas.remove(this.WaterROIData[i].roi_name_canvas);
  }

 

  SensgizModal(modal: any) {
    this.sensgizModal = this.modalService.open(modal);
  }

  


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return "by pressing ESC";
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return "by clicking on a backdrop";
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  // onAddingNewfireROI() {
  //   this.isWater = false;
  //   if (this.RAROIName.value !== null) {
  //     fabric.util.resetObjectTransform(this.newROI);
  //     var roi_points: any[] = [];
  //     const tempPoints = [...this.newROIPoints];
  //     this.polygonOptions.stroke = "orange";
  //     var dimensions = this.newROI._calcDimensions();
  //     const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions);
  //     var ROIName = this.RAROIName.value;
  //     if (ROIName !== null) {
  //       this.isChanges = true;
  //       this.canvas.add(currentROI);
  //       this.canvas.renderAll();
  //       for (let i = 0; i < this.newROIPoints.length; i++) {
  //         let tempX = this.newROIPoints[i].x;

  //         let tempY = this.newROIPoints[i].y;
  //         roi_points.push(`${tempX};${tempY};`);
  //       }
  //       //to remove the ,
  //       var comma = /,/g;
  //       var roiPointsString = roi_points.toString().replace(comma, "");
  //       var ROINameObject = new fabric.Text(ROIName, {
  //         fontSize: 20,
  //         backgroundColor: "black",

  //         selectable: false,
  //         left: dimensions.left,
  //         top: dimensions.top - 20,
  //         stroke: "orange",
  //         fill: "orange",
  //       });
  //       this.canvas.add(ROINameObject);
  //       this.canvas.renderAll();

  //       var tempObj: any = {
  //         roi_name_canvas: ROINameObject,
  //         roi_canvas: currentROI,
  //         roi_name: ROIName,
  //         roi_id: this.WaterROIData.length + 1,
  //         roi_data: {
  //           bb_box: roiPointsString,
  //           roi_name: ROIName,
  //           roi_id: this.WaterROIData.length + 1,
  //         },
  //       };
  //     }
  //     this.WaterROIData.push(tempObj);

  //     this.newROIPoints.splice(0, this.newROIPoints.length);
  //     this.RAROIName.setValue(null);
  //     this.RAROIName.reset();
  //     this.RAROIName.setValidators(Validators.required);
  //     this.classIDPerson.reset();
  //     this.classIDBike.reset();
  //     this.classIDCar.reset();
  //     this.classIDPerson.setValue("person");
  //     this.classIds = ["person"];
  //   } else {
  //     this.classIds = ["person"];

  //     this.DeleteNewDrawnROI();
  //   }
  // }

 

  // CreateRectangle(e: any) {
  //   var pointer = this.canvas.getPointer(e.e);
  //   var orgX = e.pointer.x;
  //   var orgY = e.pointer.y;
  //   this.rectangle = new fabric.Rect({
  //     left: orgX,
  //     top: orgY,
  //     width: pointer.x - orgX,
  //     height: pointer.y - orgY,
  //     stroke: "red",
  //     type: "rect",
  //     strokeWidth: 2,
  //   });
  //   this.canvas.add(this.rectangle);
  //   if (orgX > pointer.x) {
  //     this.rectangle.set({ left: Math.abs(pointer.x) });
  //   }
  //   if (orgY > pointer.y) {
  //     this.rectangle.set({ top: Math.abs(pointer.y) });
  //   }

  //   this.rectangle.set({ width: Math.abs(orgX - pointer.x) });
  //   this.rectangle.set({ height: Math.abs(orgY - pointer.y) });

  //   this.canvas.renderAll();
  // }

  // createRect2(e: any) {
  //   var pointer = this.canvas.getPointer(e.e);
  //   var orgX = e.pointer.x;
  //   var orgY = e.pointer.y;
  //   if (e.button === 1) {
  //     if (orgX > pointer.x) {
  //       this.rectangle.set({ left: Math.abs(pointer.x) });
  //     }
  //     if (orgY > pointer.y) {
  //       this.rectangle.set({ top: Math.abs(pointer.y) });
  //     }

  //     this.rectangle.set({ width: Math.abs(orgX - pointer.x) });
  //     this.rectangle.set({ height: Math.abs(orgY - pointer.y) });
  //     this.canvas.renderAll();
  //   }
  // }

  // public Edit(i: number) {
  //   this.selectedEditId = i;
  //   var canvasObject = this.allCameraData[i].roi_canvas;
  //   this.isEdit = true;
  //   if (this.isEdit) {
  //     //var polygonPositionHandler=
  //     var anchorWrapper = (anchorIndex: any, fn: any) => {
  //       return (eventData: any, transform: any, x: any, y: any) => {
  //         var fabricObject = transform.target,
  //           absolutePoint = fabric.util.transformPoint(
  //             new fabric.Point(
  //               fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
  //               fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
  //             ),
  //             fabricObject.calcTransformMatrix()
  //           ),
  //           actionPerformed = fn(eventData, transform, x, y),
  //           newDim = fabricObject._setPositionDimensions({}),
  //           polygonBaseSize = fabricObject._getNonTransformedDimensions(),
  //           newX =
  //             (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
  //             polygonBaseSize.x,
  //           newY =
  //             (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
  //             polygonBaseSize.y;
  //         fabricObject.setPositionByOrigin(
  //           absolutePoint,
  //           newX + 0.5,
  //           newY + 0.5
  //         );
  //         return actionPerformed;
  //       };
  //     };
  //     var actionHandler = (
  //       eventData: any,
  //       transform: any,
  //       x: number,
  //       y: number
  //     ) => {
  //       var polygon = transform.target,
  //         currentControl = polygon.controls[polygon.__corner],
  //         mouseLocalPosition = polygon.toLocalPoint(
  //           new fabric.Point(x, y),
  //           "center",
  //           "center"
  //         ),
  //         polygonBaseSize = polygon._getNonTransformedDimensions(),
  //         size = polygon._getTransformedDimensions(0, 0),
  //         finalPointPosition = {
  //           x:
  //             (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
  //             polygon.pathOffset.x,
  //           y:
  //             (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
  //             polygon.pathOffset.y,
  //         };
  //       polygon.points[currentControl.pointIndex] = finalPointPosition;
  //       return true;
  //     };

  //     let poly = canvasObject;
  //     this.canvas.setActiveObject(this.allCameraData[i].roi_canvas);
  //     poly = this.canvas.getActiveObject();

  //     if (true) {
  //       let lastControl = poly.points.length - 1;
  //       poly.cornerStyle = "circle";
  //       poly.cornerColor = "rgba(0,0,255,0.5)";
  //       poly.controls = poly.points.reduce(
  //         (acc: any, point: number, index: number) => {
  //           acc["p" + index] = new fabric["Control"]({
  //             pointIndex: index,
  //             positionHandler: (
  //               dim: any,
  //               finalMatrix: any,
  //               fabricObject: any
  //             ) => {
  //               let x =
  //                   fabricObject.points[index].x - fabricObject.pathOffset.x,
  //                 y = fabricObject.points[index].y - fabricObject.pathOffset.y;
  //               return fabric.util.transformPoint(
  //                 new fabric.Point(x, y),
  //                 fabric.util.multiplyTransformMatrices(
  //                   fabricObject.canvas.viewportTransform,
  //                   fabricObject.calcTransformMatrix()
  //                 )
  //               );
  //             },
  //             actionHandler: anchorWrapper(
  //               index > 0 ? index - 1 : lastControl,
  //               actionHandler
  //             ),
  //             actionName: "modifyPolygon",
  //           });
  //           return acc;
  //         },
  //         {}
  //       );
  //     }
  //     this.canvas.renderAll();
  //   }
  // }

  // EditROI(id: string) {
  //   this.isChanges = true;
  //   var currentObject: any = this.allCameraData.filter((ROI: any) => {
  //     return ROI.roi_id === id ? ROI.roi_canvas : "";
  //   });
  //   var currentPolygon = currentObject[0].roi_canvas;
  // }

  

 

  //delete roi in backend

  // CalculateAspectRatio(orgWidth: any, orgHeight: any, newWidth: any) {
  //   this.ratio = orgHeight / orgWidth;
  //   var newHeight = this.ratio * newWidth;
  //   return newHeight;
  // }
  
  
  
  // FireSmokeConfig(event: any) {
  //   if (event.target.checked) {
  //     if (event.target.value === "helmet") {
  //       this.isEdit = true;
  //       this.PPEConfig.helmet = true;
  //     }
  //     if (event.target.value === "vest") {
  //       this.isEdit = true;
  //       this.PPEConfig.vest = true;
  //     }
  //   } else {
  //     this.isEdit = true;
  //     if (event.target.value === "helmet") {
  //       this.PPEConfig.helmet = false;
  //     }
  //     if (event.target.value === "vest") {
  //       this.PPEConfig.vest = false;
  //     }
  //   }
  //   this.savePpeConfig();
  // }

 

  // VehicleConfig(event: any) {}

  

  //traffic count roi
 

  // SaveCCPeople() {
  //   var temp: any = {};
  //   temp.label = ["people"];
  //   temp.min_count = this.peopleCrowdForm.get("min").value;
  //   temp.max_count = this.peopleCrowdForm.get("max").value;
  //   temp.roi_id = null;
  // }

  // SaveCCVehicle() {
  //   var temp: any = {};
  //   temp.label = ["vehicle"];
  //   temp.min_count = this.peopleCrowdForm.get("min").value;
  //   temp.max_count = this.peopleCrowdForm.get("max").value;
  //   temp.roi_id = null;
  // } 

  // GetCameraFeedImage() {
  //   this.loader1 = true;
  //   this.server.UpdateCameraFeedImage(this.ID).subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         this.imageName = response.message[0].imagename;
  //         this.SetCameraImageToCanvas();
  //         this.loader1 = false;
  //         this.router.navigate([], {
  //           relativeTo: this.ActiveRoute,
  //           queryParams: { iamgename: this.imageName },
  //           queryParamsHandling: "merge",
  //         });
  //       } else {
  //         this.loader1 = false;
  //         this.server.notification(response.message, "Retry");
  //       }
  //     },
  //     (Err) => {
  //       this.loader1 = false;
  //     }
  //   );
  // }


  // selectMinute(minute: number): void {
  //   this.selectedMinute = minute;
  // }


 

  // onInputChange(value: string) {
  //   this.isSpecialCharEntered = !/^[a-zA-Z0-9_\s]*$/.test(value);
  //   // alert('Please Remove Special characters')
  // }


  // onInputChange(roi:any) {
  //   const value = roi.value;
  //   this.isSpecialCharEntered = !/^[a-zA-Z0-9_\s]*$/.test(value);
  // }

 
  
  ngOnDestroy() {
    this.modalService.dismissAll();
  }
  
}
