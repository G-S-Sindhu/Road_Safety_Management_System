import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { interval, Observable, of } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';
import { saveAs } from 'file-saver';
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from '../../common/sortable.directive'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { validate } from 'uuid';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-esi-moniter',
  templateUrl: './esi-moniter.component.html',
  styleUrls: ['./esi-moniter.component.css']
})
export class ESIMoniterComponent implements OnInit, AfterViewInit, OnDestroy {
  dropdownSettings: IDropdownSettings
  dropdownSettings2: IDropdownSettings
  cameras: Observable<any[]>
  panelNumbers: Observable<any[]>
  violationTypes: Observable<any[]>
  plants: Observable<any[]>
  areas: Observable<any[]>
  panels: Observable<any[]>
  selectedCamera: any
  selectedPanel: any
  selectedPlant: any
  selectedArea: any
  selectedViolation: any
  notInJobList: any[] = []
  enabledCameras: any[] = []
  total: Observable<number> = of(0)
  page: number = 1
  pageSize: number = 10
  tempData: any[] = []
  isLoading: boolean = false
  isAreaDisable: boolean = true
  editField: string
  intervalTime: number
  selectedRiro: any
  Images: any[] = []
  subJobs: any[] = []
  subJobForms: FormGroup[] = []
   deleteJob:any
  subjobValids: any[] = []  
  conveyorImage:Observable<string>=of('')
  selectedField:string=''

  jobTypes: Observable<any[]> = of([{ text: 'HT', id: 0 },
  { text: 'conveyor', id: 1 },
  { text: 'hydraulic', id: 2 },
  { text: 'pneumatic', id: 3 },
  { text: 'LT', id: 4 },
    // { item_text: 'Isolating Area', item_id: 6 },
  ])

  startAppConfig: FormControl = new FormControl('', Validators.required)
  AppConfig: number = 0
  IP: any


  tempField: FormControl = new FormControl('', Validators.required)
  isPanelDisable: boolean = true
  cameraBrandList: Observable<any[]> = of([{ id: 1, text: 'cp_plus' }])

  jobsheetData: Observable<any[]> = of([])
  headers: any[] = [{ columnName: 'Sl.No.', showColumn: true },
  { columnName: 'Plant', showColumn: true },
  { columnName: 'Job Description', showColumn: true },
  { columnName: 'panel', showColumn: true },
  { columnName: 'Isolating locations', showColumn: true },
  { columnName: 'IP Address', showColumn: true }]
  totalJobsheetEntries: number = 0
  showPanel: boolean = true
  showJD: boolean = true
  showPlant: boolean = true
  showNIP: boolean = true
  showIA: boolean = true
  showIP: boolean = true
  showArea: boolean = true
  showSI: boolean = true
  showPS: boolean = true
  showTime: boolean = true
  showTag: boolean = true
  showLock: boolean = true
  showRackIn: boolean = true
  showRackOut: boolean = true
  showRemark: boolean = true
  showFlasher: boolean = true
  show5Meter: boolean = true
  showSplasher: boolean = true
  showUntag: boolean = true
  showUnlock: boolean = true
  showRackITime: boolean = true
  showRackOTime: boolean = true
  showRackIMethod: boolean = true
  showRackOMethod: boolean = true
  showMTime: boolean = true
  showType: boolean = true
  showBoard: boolean = true
  showDepartment: boolean = true
  showTagName: boolean = true
  flasherImages: any[] = []
  selectedColumn: any[] = []
  selectedJobsheet: any
  isDesc: boolean = false
  selectedPlants: any[] = []
  selectedAreas: any[] = []
  selectedPanels: any[] = []
  excelLoad: boolean = false
  Interval: any
  isActive: boolean = false
  showRack: boolean = true
  showRackProcess: boolean = true
  showEdit: boolean = true
  showPpeViol: boolean = true
  showPowerStatus: boolean = true
  isEditMode: boolean = false
  editedRackProc: any
  selectedEditIndex: any
  appStatus: boolean = false
  tag: any
  lock: any
  loader2: boolean = true
  isSuccess: boolean = false
  isFail: boolean = false
  responseMessage: string = ''
  rackMethod: FormControl = new FormControl('', Validators.required)
  fiveMeter: FormControl = new FormControl('', Validators.required)

  rackProcess: FormControl = new FormControl('', Validators.required)


  rackMethodForm: FormControl = new FormControl('', Validators.required)
  meter5rule: FormControl = new FormControl('', Validators.required)
  jobsStatus: any = { not_processed: 0, processed_count: 0, total_jobs: 0 }
  remarkControl: FormControl = new FormControl('', Validators.required)
  AddCameraForm: FormGroup = new FormGroup({
    cameraname: new FormControl('', Validators.required),
    camera_brand: new FormControl('', Validators.required),
    cameraip: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    plant: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    port: new FormControl('', Validators.required),
    job_description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    board: new FormControl('', Validators.required),
    tagname: new FormControl('', Validators.required),
    rtsp_url: new FormControl(''),
    isHooter: new FormControl(''),
    isRelay: new FormControl(''),
    jobInfo: new FormControl(''),
    hooterIp: new FormControl(''),
    hooterConfig: new FormControl(''),
    no_of_isolating_points: new FormControl('', Validators.required),
    isolating_locations: new FormControl('', Validators.required),
    relayIp: new FormControl(''),

  })

  mainJobForm: FormGroup = new FormGroup({
    cameraname: new FormControl('', Validators.required),
    cameraip: new FormControl('', Validators.required),

    plant: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    job_description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    board: new FormControl('', Validators.required),
    tagname: new FormControl('', Validators.required),
    // isHooter: new FormControl(''),
    // isRelay: new FormControl(''),
    // hooterIp: new FormControl(''),
    // hooterConfig: new FormControl(''),
    panel_no: new FormControl('', Validators.required),
    no_of_isolating_points: new FormControl('', Validators.required),
    isolating_locations: new FormControl('', Validators.required),
    relayIp: new FormControl(''),

  })


  isFormValid: boolean = false

  dataHeaders: any[] = [{ item_text: 'Job No', item_id: 0 },
  { item_text: 'Plant', item_id: 1 },
  { item_text: 'Type', item_id: 25 },
  { item_text: 'Department', item_id: 26 },
  { item_text: 'Area', item_id: 2 },
  { item_text: 'Job Description', item_id: 3 },
  { item_text: 'Board', item_id: 27 },
  { item_text: 'Panel', item_id: 4 },
  { item_text: 'No of Isolating Points', item_id: 5},

  { item_text: 'Isolating Area', item_id: 6 },

  { item_text: 'IP Address', item_id: 7 },
  { item_text: 'Panel Status', item_id: 8 },
  { item_text: 'Tag Name', item_id: 28 },

  { item_text: 'Power Status', item_id: 18 },
  { item_text: 'RO Time', item_id: 9 },
  { item_text: 'RO Method', item_id: 10 },
  { item_text: 'Tag', item_id: 12 },
  { item_text: 'Lock', item_id: 13 },
  { item_text: 'Magnetic Flasher', item_id: 17 },

  { item_text: 'RI Time', item_id: 19 },
  { item_text: 'RI Method', item_id: 21 },
  { item_text: 'UnTag', item_id: 22 },
  { item_text: 'UnLock', item_id: 23 },

  { item_text: 'Maintenance Time', item_id: 24 },

  { item_text: '5 Meter violation', item_id: 20 },
  { item_text: 'PPE Violation', item_id: 14 },

  { item_text: 'Remark', item_id: 15 },



  { item_text: 'Edit', item_id: 16 },




  ]

  // @ViewChildren(NgbdSortableHeader) sortableHeaders: QueryList<NgbdSortableHeader>

  dataJobsheets: Observable<any[]> = of([{ item_text: 'Previous Excel', item_id: 0 },
  { item_text: 'latest Excel', item_id: 1 }])

  constructor(
    public server: ServerService,
    public router: Router,
    public modalService: NgbModal,
    public _lightbox: Lightbox,
    public _lightBoxConfig: LightboxConfig
  ) {
    this._lightBoxConfig.showDownloadButton = true

    this.IP = this.server.IP
    this.intervalTime = this.server.jobsheetInterval
    console.log(this.intervalTime)
    this.GetJobsheetStatus()
    this.remarkControl.valueChanges.subscribe((Data: any) => {
      console.log(Data)
    })
    this.server.CheckApplicationStatus().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        var process = response.message.find((el: any) => {
          console.log(el)
          return el.process_name == 'esi-monitor' ? el : ''
        })
        console.log(process)
        this.isActive = process.process_status
        console.log(this.isActive)
        // this.isActive=true
      }
    })
    this.GetCameraBrands()

    this.GetPlantList()
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'No data',
      maxHeight: 197
    };

    this.dropdownSettings2 = {
      singleSelection: true,
      idField: "id",
      textField: "text",
      disabledField: "isDisabled",

      // enableCheckAll: true,
      // selectAllText: "Select All",
      // unSelectAllText: "UnSelect All",
      // allowSearchFilter: false,
      // limitSelection: 1,
      closeDropDownOnSelection: true,

      clearSearchFilter: true,
      // maxHeight: 197,
      // itemsShowLimit: 999999999999,
      searchPlaceholderText: "Search",
      noDataAvailablePlaceholderText: "No data available",
      noFilteredDataAvailablePlaceholderText: "No filtered data available",
      showSelectedItemsAtTop: false,
      defaultOpen: false,
      allowRemoteDataSearch: false,
    }
    //this.getJobsheetData()

  }

  ngOnInit(): void {
    this.startAppConfig.setValue(0)

    var table = document.getElementById('dataTable')
    table.classList.add('loader')
    this.server.GetJobSheet().subscribe((response: any) => {
      table.classList.remove('loader')
      console.log(response)
      if (response.job_sheet_status) {
        if (response.success) {

          this.total = of(response.message.length)
          this.jobsheetData = of(response.message)
          this.tempData = response.message
          this.tempData = this.ModifyData(this.tempData)
          this.tempData = this.SortLivewise(this.tempData)

          this.sliceData()


        }
        else {
          this.server.notification('Data not found')
        }
      }
      else {
        this.router.navigate(['app/jobsheetUpload'])
      }
    },
      err => {
        this.server.notification('Error while fetching the data', 'Retry')
        table.classList.remove('loading')
      })
  }

  ngAfterViewInit(): void {
    this.Interval = setInterval(() => {
      this.ShowData()
      this.GetJobsheetStatus()

    }, this.intervalTime)
    this.AddCameraForm.valueChanges.subscribe(value => {
      if (this.AddCameraForm.get('no_of_isolating_points').value && this.AddCameraForm.get('isolating_locations').value && this.AddCameraForm.get('cameraname').value && this.AddCameraForm.get('cameraip').value && this.AddCameraForm.get('port').value && this.AddCameraForm.get('camera_brand').value && this.AddCameraForm.get('username').value && this.AddCameraForm.get('password').value && this.AddCameraForm.get('plant').value && this.AddCameraForm.get('area').value && this.AddCameraForm.get('department').value) {
          if(this.AddCameraForm.get('type').value[0].text=='HT'){
            if(true){
              this.isFormValid=true
              this.AddCameraForm.get('rtsp_url').setValue('')
            }
            else{
              this.isFormValid=false
            }
          }
          else{
         this.isFormValid = true
          }
      }

      else if (this.AddCameraForm.get('no_of_isolating_points').value && this.AddCameraForm.get('isolating_locations').value && this.AddCameraForm.get('cameraname').value && this.AddCameraForm.get('camera_brand').value && this.AddCameraForm.get('rtsp_url').value && this.AddCameraForm.get('area').value && this.AddCameraForm.get('plant').value &&this.AddCameraForm.get('department').value) {
        if(this.AddCameraForm.get('type').value[0].text=='HT'){
          if(true){
            this.isFormValid=true
          }else{
            this.isFormValid=false
          }
        }
        else{
       this.isFormValid = true
        }
      }
      else {
        this.isFormValid = false
      }
      console.log('is form valid', this.isFormValid)
    })
  }
  OnAddCameraDetails() {
    // this.AddCameraForm.get('rtsp_url').value?this.removeValidators():''
    this.AddCameraForm.updateValueAndValidity()
    if (this.isFormValid) {

      this.isLoading = true
      var formData = new FormData()
      this.isFail = false
      this.isSuccess = false
      // for (let k in this.AddCameraForm.value) {
      //   console.log(k, this.AddCameraForm.value[k])
      //   if (k === 'camera_brand') {
      //     formData.append(k, this.AddCameraForm.value[k].text)
      //   }
      //   else {
      //     formData.append(k, this.AddCameraForm.value[k])

      //   }
      // }
    

      console.log('form_data', formData)

      if (this.AddCameraForm.get('rtsp_url').value) {
        console.log('rtsp adding')
        var ai_solution = Array
        console.log(ai_solution)
        var data1: any = {
          cameraname: this.AddCameraForm.value['cameraname'],
          camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
          plant: this.AddCameraForm.value['plant'],
          area: this.AddCameraForm.value['area'],
          rtsp_url: this.AddCameraForm.value['rtsp_url'],
          job_description: this.AddCameraForm.value['job_description'],
          no_of_isolating_points: this.AddCameraForm.value['no_of_isolating_points'],
          department: this.AddCameraForm.value['department'],
          type: this.AddCameraForm.value['type'][0].text,
          job_type:'main_job',
          
          isolating_locations: this.AddCameraForm.value['isolating_locations'],
          ai_solution: [],


        }
        if (this.AddCameraForm.value['type'][0].text != 'HT') {
          data1['common_no'] = this.AddCameraForm.value['jobInfo']
        }
        else {
         data1['board']=this.AddCameraForm.value['board']
         data1['tagname']=this.AddCameraForm.value['tagname']
         data1['common_no']=null

        }
       
        var subjobdetails= this.subjobDetails()
        console.log(subjobdetails,'subjobdetails')
       data1['subjobs']=subjobdetails

        // this.AddCameraForm.removeControl('username')
        // this.AddCameraForm.removeControl('password')
        // this.AddCameraForm.removeControl('cameraip')
        // this.AddCameraForm.removeControl('port')
        this.server.AddJobPanelByRtsp(data1).subscribe((response: any) => {
          // this.AddCameraForm.addControl('username', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('password', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('cameraip', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('port', new FormControl('', Validators.required))

          if (response.success) {
            this.isLoading = false
            this.isSuccess = true
            var job = response.message[0]
            this.subJobs=[]
            this.subjobValids=[]
            this.responseMessage = 'Camera successfully added'
            if(data1['type']=='HT'){
            var link = this.router.serializeUrl(this.router.createUrlTree(['app/panelROISettings'], { queryParams: { id: job._id.$oid, image_name: job.image_name, isNewJob: true, area: data1.area, plant: data1.plant } }))
            window.open(link, '_blank')
            }
            // this.isHooter = false
            // this.isRelay = false


            setTimeout(() => {
              this.modalService.dismissAll()

            }, 1000);
            this.RefreshData()
            //this.GetCameraList()
          }
          else {
            this.isLoading = false
            this.responseMessage = response.message
            this.isFail = true
            //this.AddCameraForm.reset()
          }
        },
          Err => {
            this.isFail = true
            this.responseMessage = "Error while adding camera,retry"
            this.isLoading = false
            // this.AddCameraForm.reset()
          })

      }


      else {
        //var ai_solution = Array
        var data: any = {
          cameraname: this.AddCameraForm.value['cameraname'],
          camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
          plant: this.AddCameraForm.value['plant'],
          area: this.AddCameraForm.value['area'],
          username: this.AddCameraForm.value['username'],
          password: this.AddCameraForm.value['password'],
          cameraip: this.AddCameraForm.value['cameraip'],
          port: this.AddCameraForm.value['port'],
          job_type:'main_job',
          job_description: this.AddCameraForm.value['job_description'],
          no_of_isolating_points: this.AddCameraForm.value['no_of_isolating_points'],
          department: this.AddCameraForm.value['department'],
          type: this.AddCameraForm.value['type'][0].text,
          isolating_locations: this.AddCameraForm.value['isolating_locations'],
          ai_solution: []
        }

        if (this.AddCameraForm.value['type'][0].text != 'HT') {
          data['common_no'] = this.AddCameraForm.value['jobInfo']
        }
       
        else {
          data['board']=this.AddCameraForm.value['board']
          data['tagname']=this.AddCameraForm.value['tagname']
          data['common_no'] = null

        }
        //    this.AddCameraForm.removeControl('rtsp_url')
        var subjobdetails= this.subjobDetails()
       data['subjobs']=subjobdetails
        this.server.AddJobPanelByIp(data).subscribe((response: any) => {
          //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))

          if (response.success) {
            this.responseMessage = response.message
            this.isSuccess = true
            this.isLoading = false
             this.subJobs=[]
             this.subjobValids=[]

            this.isLoading = false
            this.isSuccess = true
            var job = response.message[0]
            this.responseMessage = 'Camera successfully added'
            if(data['type']=='HT'){

            var link = this.router.serializeUrl(this.router.createUrlTree(['app/panelROISettings'], { queryParams: { id: job._id.$oid, image_name: job.image_name, isNewJob: true, area: data.area, plant: data.plant } }))
            window.open(link, '_blank')
            }
            
            // this.isHooter = false
            // this.isRelay = false
            setTimeout(() => {
              this.modalService.dismissAll()

            }, 1000);
            this.RefreshData()
            //this.GetCameraList()
          }
          else {

            this.isLoading = false
            this.responseMessage = response.message
            this.isFail = true
          }
        },
          (error: any) => {
            //this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))
            this.isFail = true
            this.responseMessage = "Error while adding camera,retry"
            this.isLoading = false
            // this.AddCameraForm.reset()
          })
      }
    }


    // else {
    //   this.isFail = true
    //   this.responseMessage = "Above Fields are required"
    // }
  }
  OnAddSubJob() {
    var formname = this.subJobs.length
    this.subJobForms.push(new FormGroup({
      cameraname: new FormControl('', Validators.required),
      camera_brand: new FormControl('', Validators.required),
      cameraip: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      plant: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      port: new FormControl('', Validators.required),
      jobDetails: new FormControl('', Validators.required),
      job_description: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      board: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      tagname: new FormControl('', Validators.required),
      jobInfo: new FormControl('', Validators.required),
      rtsp_url: new FormControl(''),
      isHooter: new FormControl(''),
      isRelay: new FormControl(''),
      hooterIp: new FormControl(''),
      hooterConfig: new FormControl(''),
      no_of_isolating_points: new FormControl('', Validators.required),
      isolating_locations: new FormControl('', Validators.required),
      relayIp: new FormControl(''),

    })
    )
    this.subjobValids.push({ valid: false })

    this.subJobForms[this.subJobForms.length - 1].valueChanges.subscribe((value: any) => {
      if (this.subJobForms[this.subJobForms.length - 1].get('cameraname').value && this.subJobForms[this.subJobForms.length - 1].get('cameraip').value && this.subJobForms[this.subJobForms.length - 1].get('port').value && this.subJobForms[this.subJobForms.length - 1].get('camera_brand').value && this.subJobForms[this.subJobForms.length - 1].get('username').value && this.subJobForms[this.subJobForms.length - 1].get('password').value && this.subJobForms[this.subJobForms.length - 1].get('plant').value && this.subJobForms[this.subJobForms.length - 1].get('area').value && this.subJobForms[this.subJobForms.length].get('cameraip').value) {
        console.log('adding manually')
        this.subjobValids[this.subJobForms.length - 1].valid = true
      }

      else if (this.subJobForms[this.subJobForms.length - 1].get('cameraname').value && this.subJobForms[this.subJobForms.length - 1].get('camera_brand').value && this.subJobForms[this.subJobForms.length - 1].get('rtsp_url').value && this.subJobForms[this.subJobForms.length - 1].get('area').value && this.subJobForms[this.subJobForms.length - 1].get('plant').value) {
        this.subjobValids[this.subJobForms.length - 1].valid = true

      }
      else {
        this.subjobValids[this.subJobForms.length - 1].valid= false
      }
    })

  }

  subjobDetails() {
    this.subJobs=[]
    this.subJobForms.forEach((subjob: any, index: number) => {
      console.log('valids array',this.subjobValids)
      let data1:any;
     console.log( this.subjobValids[index].valid,'subjob valid')
      if (this.subjobValids[index].valid) {
        if (subjob.get('rtsp_url').value) {
          console.log('rtsp adding')
          var ai_solution = Array
          console.log(ai_solution)
          console.log('rtsp  added subjob')
          console.log(subjob.value, 'subjob value')
          data1 = {
            cameraname: subjob.value['cameraname'],
            camera_brand: subjob.value['camera_brand'][0].text,
            plant: subjob.value['plant'],
            area: subjob.value['area'],
            
            type:subjob.value['type'][0].text,
            department:subjob.value['department'],
            rtsp_url: subjob.value['rtsp_url'],
            job_description:subjob.value['job_description'],
            no_of_isolating_points: subjob.value['no_of_isolating_points'],
            job_type:'sub_job',
            isolating_locations: subjob.value['isolating_locations'],
            ai_solution: [],
          }

console.log(data1,'data1')

if (subjob.value['type'][0].text != 'HT') {
  data1['common_no'] = subjob.value['jobInfo']
}

else {
  data1['board']=subjob.value['board']
  data1['tagname']=subjob.value['tagname']
  data1['common_no'] = null

}

          // this.AddCameraForm.removeControl('username')
          // this.AddCameraForm.removeControl('password')
          // this.AddCameraForm.removeControl('cameraip')
          // this.AddCameraForm.removeControl('port')


        }


        else {
          console.log('camera details  added subjob')
          //var ai_solution = Array
          console.log(subjob.value['camera_brand'][0].text)
          data1= {
            cameraname: subjob.value['cameraname'],
            camera_brand: subjob.value['camera_brand'][0].text,
            plant: subjob.value['plant'],
            area: subjob.value['area'],
            username: subjob.value['username'],
            password: subjob.value['password'],
            cameraip: subjob.value['cameraip'],
            port: subjob.value['port'],
            job_description: subjob.value['job_description'],
            type: subjob.value['type'][0].text,
            department: subjob.value['department'],
            no_of_isolating_points: subjob.value['no_of_isolating_points'],
            job_type:'sub_job',
            isolating_locations: subjob.value['isolating_locations'],
            ai_solution: []
          }
          if (subjob.value['type'][0].text != 'HT') {
            data1['common_no'] = subjob.value['jobInfo']
          }
          
          else {
            data1['board']=subjob.value['board']
            data1['tagname']=subjob.value['tagname']
            data1['common_no'] = null
          
          }


          //    this.AddCameraForm.removeControl('rtsp_url')


        }
        this.subJobs.push(data1)
      }
    })


    console.log('subjobdetails', this.subJobs)
    return this.subJobs

  }
  LoadMainJobDetails(subjob: FormGroup) {
    subjob.get('cameraname').setValue(this.AddCameraForm.get('cameraname').value)
    subjob.get('camera_brand').setValue(this.AddCameraForm.get('camera_brand').value)
    subjob.get('plant').setValue(this.AddCameraForm.get('plant').value)
    subjob.get('area').setValue(this.AddCameraForm.get('area').value)

    subjob.get('department').setValue(this.AddCameraForm.get('department').value)
    subjob.get('board').setValue(this.AddCameraForm.get('board').value)
    subjob.get('tagname').setValue(this.AddCameraForm.get('tagname').value)
    subjob.get('type').setValue(this.AddCameraForm.get('type').value)
    subjob.get('no_of_isolating_points').setValue(this.AddCameraForm.get('no_of_isolating_points').value)
    subjob.get('isolating_locations').setValue(this.AddCameraForm.get('isolating_locations').value)
    subjob.get('job_description').setValue(this.AddCameraForm.get('job_description').value)
    subjob.get('no_of_isolating_points').setValue(this.AddCameraForm.get('no_of_isolating_points').value)







  }



  JobsheetDownload() {
    this.excelLoad = true
    this.server.CreateJobsheetExcel().subscribe((Response: any) => {
      if (Response.success) {

        // this.excelLoad = false
        //console.log(Response)
        console.log("APi data for excel")

        console.log(Response)

        this.server.DownloadJobsheet().subscribe(
          (response: any) => {
            console.log(response)
            this.excelLoad = false
            this.excelLoad = false
            var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'


            const blob = new Blob([response.body], { type: '.xlsx' });
            // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
            var fileName = "JobSheet" + " " + (this.server.dateTransformbyPattern(new Date, 'yyyy_MM_dd_HH_mm_ss')) + '.xlsx'
            const file = new File([blob], fileName, { type: '.xlsx' });
            saveAs(blob, fileName);
          },
          err => {
            this.excelLoad = false
            console.log(err)
            this.server.notification(err.text)
          })
      }
      else {
        this.server.notification(Response.message, 'Retry')
        this.excelLoad = false
        // this.isExcel = false
        // this.alertmessage = Response.message
        // this.isalert = true

      }
    },
      err => {
        this.excelLoad = false

        // this.isExcel = false
        this.server.notification("Error while creating excel", 'Retry')
      })
  }



  GetPlantList() {
    this.server.GetPlantList().subscribe((response: any) => {
      if (response.success) {
        var temp: any[] = []
        response.message.forEach((element: any, i: number) => {
          temp.push({ item_text: element, item_id: i })

        });


        this.plants = of(temp)
        // this.plants=of(mess)
      }
    })
  }



  //..............multiselectdropdown selecting functions...................

  OnPlantSelect(event: any) {
    console.log(this.selectedPlant)
    this.selectedPlants = []
    this.selectedPlant.forEach((element: any) => {
      this.selectedPlants.push(element.item_text)

    });

    // console.log(this.selectedPlants)

    this.GetAreaList()
    this.GetPanelList()
    // this.server.GetAreasByPlant()
  }

  OnAreaSelect(event: any) {
    this.selectedAreas = []
    this.selectedArea.forEach((element: any) => {
      this.selectedAreas.push(element.item_text)

    });
    this.GetPanelList()
    console.log(this.selectedAreas)
  }

  OnPanelSelect(event: any) {
    this.selectedPanels = []
    this.selectedPanel.forEach((element: any) => {
      this.selectedPanels.push(element.item_text)

    });
    // this.GetPanelList()
  }

  //............................................................................

  //................ngmultiselect deselect functions................................
  onDeselectPlant(event: any) {
    console.log(event)

    if (this.selectedPlant.length === 0) {
      this.isAreaDisable = true
    }
    var string = event.item_text
    var index = this.selectedPlants.indexOf(event.item_text)
    console.log(index)

    this.selectedPlants.splice(index, 1)
    this.GetAreaList()
  }

  OnDeselectArea(event: any) {
    if (this.selectedArea.length === 0) {
      this.isPanelDisable = true
    }
    console.log(event.item_text)
    var string = event.item_text
    var index = this.selectedAreas.indexOf(event.item_text)
    this.selectedAreas.splice(index, 1)
    console.log(this.selectedAreas)

  }
  OnDeselectPanel(event: any) {
    console.log(event.item_text)
    var string = event.item_text
    var index = this.selectedPanels.indexOf(event.item_text)
    this.selectedPanels.splice(index, 1)
    console.log(this.selectedPanels)

  }

  //..............................................................................



  GetAreaList() {
    this.server.GetAreasByPlant(this.selectedPlants).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        var temp: any[] = []
        response.message.forEach((element: any, i: number) => {
          temp.push({ item_text: element, item_id: i })
          this.isAreaDisable = false
        });

        console.log(temp)

        this.areas = of(temp)
      }
    })
  }

  GetPanelList() {
    // this.server.GetPanelsByArea()
    this.server.GetPanelsList(this.selectedPlants, this.selectedAreas).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        var temp: any[] = []
        response.message.forEach((element: any, i: number) => {
          temp.push({ item_text: element, item_id: i })
          this.isPanelDisable = false
        });

        console.log(temp)

        this.panelNumbers = of(temp)
      }
    })
  }


  // dataHeaders: any[] = [{ item_text: 'SI no', item_id: 0 },
  // { item_text: 'Plant', item_id: 1 },
  // { item_text: 'Area', item_id: 2 },
  // { item_text: 'Job Description', item_id: 3 },
  // { item_text: 'Panel', item_id: 4 },
  // { item_text: 'Isolating Area', item_id: 6 },
  // { item_text: 'IP Address', item_id: 7 },
  // { item_text: 'Panel Status', item_id: 8 },
  // {item_text:'Power Status',item_id:18},
  // {item_text:'Rack out Time',item_id:9},
  // {item_text:'Rack out Method',item_id:10},
  // { item_text: 'Tag', item_id: 12 },
  // { item_text: 'Lock', item_id: 13 },
  // { item_text: 'Magnetic Flasher', item_id: 17 },

  // {item_text:'Rack In Time',item_id:19},
  // {item_text:'Rack In Method',item_id:21},
  // { item_text: 'UnTag', item_id: 22 },
  // { item_text: 'UnLock', item_id: 23 },


  // { item_text: '5 Meter violation', item_id: 20 },
  // { item_text: 'PPE Violation', item_id: 14 },

  // { item_text: 'Remark', item_id: 15 },



  // { item_text: 'Edit', item_id: 16 },




  // ]
  onHideColumn(event: any) {
    console.log(event)
    this.selectedColumn.push(event.item_text)
    switch (event.item_id) {
      case 0: {
        this.showSI = false
        break;
      }
      case 1: {
        this.showPlant = false
        break;
      }
      case 2: {
        this.showArea = false
        break;
      }
      case 3: {
        this.showJD = false
        break;
      }
      case 4: {
        this.showPanel = false
        break;
      }
      case 5: {
        this.showNIP = false
        break;
      }
      case 6: {
        this.showIA = false
        break;
      }
      case 7: {
        this.showIP = false
        break;
      }
      case 8: {
        this.showPS = false
        break;
      }
      case 9: {
        this.showRackOTime = false
        break;
      } case 10: {
        this.showRackOMethod = false
        break;
      }
      case 10: {
        this.showTime = false
        break;
      }
      case 11: {
        this.showRackProcess = false
        break;
      }
      case 12: {
        this.showTag = false
        break;
      } case 13: {
        this.showLock = false
        break;
      }
      case 14: {
        this.showPpeViol = false
        break;
      }
      case 15: {
        this.showRemark = false
        break;
      }
      case 16: {
        this.showEdit = false
        break;
      }
      case 17: {
        this.showSplasher = false
        break;
      }
      case 18: {
        this.showPowerStatus = false
        break;
      }
      case 19: {
        this.showRackITime = false
        break;
      }
      case 21: {
        this.showRackIMethod = false
        break;
      }
      case 22: {
        this.showUntag = false
        break;
      }
      case 23: {
        this.showUnlock = false
        break;
      }
      case 20: {
        this.show5Meter = false
        break;
      }
      case 24: {
        this.showMTime = false
        break;
      }
      case 25: {
        this.showType = false
        break;
      }
      case 26: {
        this.showDepartment = false
        break;
      }
      case 27: {
        this.showBoard = false
        break;
      }
      case 28: {
        this.showTagName = false
        break;
      }
     
    }



  }
  onShowColumn(event: any) {
    switch (event.item_id) {
      case 0: {
        this.showSI = true
        break;
      }
      case 1: {
        this.showPlant = true
        break;
      }
      case 2: {
        this.showArea = true
        break;
      }
      case 3: {
        this.showJD = true
        break;
      }
      case 4: {
        this.showPanel = true
        break;
      }
      case 5: {
        this.showNIP = true
        break;
      }
      case 6: {
        this.showIA = true
        break;
      }
      case 7: {
        this.showIP = true
        break;
      }
      case 8: {
        this.showPS = true
        break;
      }
      case 9: {
        this.showRackOTime = true
        break;
      } case 10: {
        this.showRackOMethod = true
        break;
      }
      case 10: {
        this.showTime = true
        break;
      }
      case 11: {
        this.showRackProcess = true
        break;
      }
      case 12: {
        this.showTag = true
        break;
      } case 13: {
        this.showLock = true
        break;
      }
      case 14: {
        this.showPpeViol = true
        break;
      }
      case 15: {
        this.showRemark = true
        break;
      }
      case 16: {
        this.showEdit = true
        break;
      }
      case 17: {
        this.showSplasher = true
        break;
      }
      case 18: {
        this.showPowerStatus = true
        break;
      }
      case 19: {
        this.showRackITime = true
        break;
      }
      case 21: {
        this.showRackIMethod = true
        break;
      }
      case 22: {
        this.showUntag = true
        break;
      }
      case 23: {
        this.showUnlock = true
        break;
      }
      case 20: {
        this.show5Meter = true
        break;
      }

      case 24: {
        this.showMTime = true
        break;
      }
      case 25: {
        this.showType = true
        break;
      }
      case 26: {
        this.showDepartment = true
        break;
      }
      case 27: {
        this.showBoard = true
        break;
      }
      case 28: {
        this.showTagName = true
        break;
      }
      
    }


  }
  getJobsheetData() {
    var table = document.getElementById('dataTable')
    table.classList.add('loading')
    this.server.GetJobSheet().subscribe((response: any) => {
      table.classList.remove('loading')
      console.log(response)
      if (response.job_sheet_status) {
        if (response.success) {

          this.total = of(response.message.length)
          this.jobsheetData = of(response.message)
          this.tempData = response.message
          this.tempData = this.ModifyData(this.tempData)
          this.tempData = this.SortLivewise(this.tempData)
          this.sliceData()
        }
        else {
          this.server.notification('Data not found')
        }
      }
      else {
        this.router.navigate(['app/jobsheetUpload'])
      }
    },
      err => {
        this.server.notification('Error while fetching the data', 'Retry')
        table.classList.remove('loading')
      })
  }

  GetJobsheetStatus() {
    this.server.GetJobsheetStatus().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.jobsStatus = response.message
      }
    })
  }

  ResetJobSheet() {
    this.server.ResetJobsheet().subscribe((response: any) => {
      if (response.success) {
        this.router.navigate(['app/jobsheetUpload'])
      }
      else {
        this.server.notification(response.message)
        this.router.navigate(['app/jobsheetUpload'])

      }
    },
      err => {
        this.server.notification("Something went wrong", 'Retry')
      })
  }

  StartApplication() {
    this.server.ConfigRtsp(this.AppConfig).subscribe((res: any) => {
      if (res.success) {
        this.server.StartESIApp().subscribe((response: any) => {
          this.server.notification(response.message)
          if (response.success) {
            this.isActive = true
            this.modalService.dismissAll()
          }
        })
      } else {
        this.server.notification(res.message, 'Retry')
      }
    },
      Err => {
        this.server.notification('Error while the process')
      })
  }

  sliceData() {
    console.log(this.page, this.pageSize)
    this.total = of((this.tempData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempData.length)
    this.jobsheetData = of((this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
  }

  ToPPE(id: string, panel_id: string, imageName: string, area: string, plant: string) {
    var link = this.router.serializeUrl(this.router.createUrlTree(['app/panelViolation'], { queryParams: { id: id, panel: panel_id, imageName: imageName, area: area, plant: plant } }))
    window.open(link, '_blank')
    //this.router.navigate(['app/panelViolation'], { queryParams: { panel: id } })

  }

  //while adding sorting to the table headers ebable  this fucntion
  // onSort({ column, direction }: SortEvent) {
  //   // resetting other headers
  //   console.log(column, direction)
  //   this.sortableHeaders.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });
  // }

  ShowData() {
    // var table=document.getElementById('data-Table')
    // table.classList.add('loader')
    this.server.GetJobSheetDataByfilter(this.selectedPlants, this.selectedAreas, this.selectedPanels).subscribe((response: any) => {
      console.log(response)
      //table.classList.remove('loader')
      if (response.success) {
        this.total = of(response.message.length)
        //this.jobsheetData = of(response.message)
        this.tempData = response.message
        this.tempData = this.ModifyData(this.tempData)
        this.tempData = this.SortLivewise(this.tempData)
        this.sliceData()
      }
      else {
        this.total = of(0)
        //this.jobsheetData = of(response.message)
        this.tempData = []
        this.sliceData()
      }
    }
    )
  }

  isDeleteJob(modal: any, d: any) {
    this.selectedEditIndex = d._id.$oid
    this.deleteJob=d
    this.modalService.open(modal, { backdrop: 'static' })

  }
  DeleteJob() {
    if(this.deleteJob.type=='HT'){
    var index = this.tempData.findIndex((data: any) => {
      return data._oid.$oid === this.selectedEditIndex
    })
    console.log(index)
    var tempData = this.tempData[index]
    var data = {
      panel_no: this.deleteJob.data.panel_data.panel_id,
      imagename: this.deleteJob.data.image_name,
      id: this.deleteJob._id.$oid,
      panel_key_id:this.deleteJob.data.panel_data.roi_data.panel_key_id,
    }
    //need to integrate delete job api if the response true need to splice that from the data
    this.server.DeleteJobPanel(data).subscribe((response: any) => {
      this.server.notification(response.message)
      if (response.success) {
        this.tempData.splice(index, 1)
        this.getJobsheetData()
        this.GetJobsheetStatus()
        this.sliceData()

      }
      this.modalService.dismissAll()
    },
      Err => {
        this.server.notification('Error while deleting job', 'Retry')
      })
    }
    else{

      this.server.DeleteMechJobs(this.deleteJob._id.$oid).subscribe((response:any)=>{
         if(response.success){
          this.server.notification(response.message)
          this.modalService.dismissAll()
          this.getJobsheetData()
        this.GetJobsheetStatus()
        this.sliceData()
         }
         else{
          this.server.notification(response.message)
         }
      },
      Err=>{
        this.server.notification('Error while deleting Job','Retry')
      })
    }

  }

  //modal to  addd the remark
  RemarkModal(modal: any, data: any, field: any) {
    console.log('remark modal')
    this.editField = field
    this.selectedEditIndex = data.riro_key_id
    // console.log(data.sl_no)

    this.modalService.open(modal, { backdrop: 'static' })
  }


  EditRemark(modal: any, data: any, field: any) {
    this.editField = field
    this.selectedEditIndex = data.riro_key_id
    // var index = this.tempData.findIndex((data: any) => {
    //   return data.riro_key_id == this.selectedEditIndex
    // })
    // var temp = this.tempData[index]
    this.remarkControl.setValue(data.remarks)

    console.log(data.sl_no)

    this.modalService.open(modal, { backdrop: 'static' })
  }
  RackEditModal(modal: any, data: any, field: any) {
    this.selectedRiro = data
    this.editField = field
    this.selectedEditIndex = data.riro_key_id
    this.editedRackProc = data.rack_process != null ? data.rack_process : 'noProcess'

    this.rackProcess.setValue(data.rack_process)
    console.log(this.editedRackProc, data)
    this.modalService.open(modal, { backdrop: 'static', size: 'xl' })

    // if(data.rack_process=='rack_in'){
    //   var temp:any=document.getElementById('rackin')
    //   temp.checked=true
    // }
    // else if(data.rack_process=='rack_out'){
    //   var temp:any=document.getElementById('rackout')
    //   temp.checked.false
    // }
    // else{
    //   var temp:any=document.getElementById('noProcess')
    //   temp.checked=false
    // }

  }

  StopAppModal(modal: any) {
    this.modalService.open(modal, { centered: true, backdrop: 'static' })

  }

  StartAppModal(modal: any) {
    this.startAppConfig.setValue(0)
    this.modalService.open(modal, { centered: true, backdrop: 'static' })

  }
  modalOpen(modal: any) {
    this.modalService.open(modal, { size: 'lg' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      //  this.roiNameControl.setValue(null)
      //  this.OnAddingNewROI()
      // this.download = '',
      //   this.isalert = false

      console.log('cancel')
      this.AddCameraForm.reset()
      this.isFail = false
      this.isSuccess = false
      this.isLoading = false
      this.subJobs=[]
      this.subjobValids=[]
      this.subJobForms.forEach((form:FormGroup) => {
        form.reset()
     });
     this.subJobForms.splice(0,this.subJobForms.length)
      // this.newROIPoints.splice(0,this.newROIPoints.length)
      // this.OnAddingNewROI()
    }, (reason: any) => {
      console.log('submit')
      this.isLoading = false
      /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // this.download = '',
      //   this.isalert = false
      this.AddCameraForm.reset()
      this.subJobForms.forEach((form:FormGroup) => {
         form.reset()
      });
      this.isFail = false
      this.isSuccess = false
   this.subJobs=[]
   this.subjobValids=[]
        ;
        this.subJobForms.splice(0,this.subJobForms.length)

    }
    )
  }


  SaveRemark() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex
    })
    console.log(index)
    var data1: any = {
      riro_key_id: this.selectedEditIndex,

    }
    data1[this.editField] = this.remarkControl.value
    this.server.EditRiroJob(data1).subscribe((response: any) => {

      if (response.success) {
        this.server.notification(response.message)
        this.getJobsheetData()
        this.GetJobsheetStatus()
        this.modalService.dismissAll()
      }
      else {
        this.server.notification(response.message, 'Retry')
      }
    },
      Err => {
        this.server.notification('Error while updating', 'Retry')
      })

  }
  selectEditField(modal: any, data: any, field: string) {
    console.log(field)
    this.editField = field
    this.selectedRiro = data
    this.selectedEditIndex = data.riro_key_id
    // var index = this.tempData.findIndex((data: any) => {
    //   return data.riro_key_id == this.selectedEditIndex
    // })
    // var temp = this.tempData[index]
    // if (this.editField == 'ip_address' || this.editField == 'panel_id') {

    //   this.tempField.setValue(this.tempData[index].data[this.editField])
    // }
    // else if (this.editField == 'five_meter') {

    //   this.tempField.setValue(this.tempData[index][this.editField].violation?this.tempData[index].this.editField.violation?'Yes':'No':'No')
    // }
    // else if (this.editField == 'panel_id') {
    //   this.tempField.setValue(this.tempData[index].data.panel_data[this.editField])
    // }

    // else {
    //   this.tempField.setValue(this.tempData[index][this.editField])

    // }
    this.tempField.setValue(data[this.editField])
    this.modalService.open(modal, { backdrop: 'static' })

  }

  ToRackEdit(data: any) {
    console.log(data)
    var link = this.router.serializeUrl(this.router.createUrlTree(['/app/rackEdit'], { queryParams: { id: data._id.$oid, panel: data.data.panel_data.panel_id, area: data.area, plant: data.plant, image_name: data.data.image_name } }))
    window.open(link, '_blank')
  }

  StopApplication() {
    this.server.StopESIApp().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.isActive = false
        this.modalService.dismissAll()
        this.server.notification(response.message)
      }
      else {
        this.server.notification(response.message)
      }
    },
      err => {
        this.server.notification('Error while the process', 'Retry')
      })
  }

  EditRack(event: any) {
    console.log(event)
    this.editedRackProc = event.target.value

  }
  StartAppConfig(event: any) {
    console.log(typeof (event.target.value))
    this.AppConfig = Number(event.target.value)
  }

  SaveFieldChanges() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex
    })

    var temp = this.tempData[index]
    if (this.editField === 'five_meter') {
      this.tempField.setValue(this.tempField.value === 'Yes' ? true : false)
    }
    var field = this.editField
    var data2: any = {
      riro_key_id: this.selectedEditIndex,

    }

    data2[this.editField] = this.tempField.value
    this.server.EditRiroJob(data2).subscribe((response: any) => {
      if (response.success) {
        this.server.notification(response.message)
        this.getJobsheetData()
        this.GetJobsheetStatus()
        this.modalService.dismissAll()
      }
      else {
        this.server.notification(response.message, 'Retry')
      }
    }, Err => {
      this.server.notification('Error while updating', 'Retry')
    })

  }

  SaveRackChanges() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex
    })
    var field = this.editField
    console.log(index)
    var data1: any = {
      riro_key_id: this.selectedEditIndex,

    }
    data1[this.editField] = this.editedRackProc
    console.log(data1)
    this.server.EditRiroJob(data1).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        // this.tempData[index].rack_process = this.editedRackProc
        // if (this.tempData[index].rack_process === null) {
        //   this.tempData[index].rack_method = null
        // }
        // this.sliceData()
        this.getJobsheetData()
        this.GetJobsheetStatus()
        this.modalService.dismissAll()
      }
      else {
        this.server.notification(response.message, 'Retry')
      }
    },
      Err => {
        this.server.notification('Error while updating', 'Retry')
      })
  }
  RefreshData() {
    this.selectedArea = ''
    this.selectedPanel = ''
    this.selectedPlant = ''
    this.selectedAreas = []
    this.selectedPanels = []
    this.selectedPlants = []
    this.getJobsheetData()
    this.GetJobsheetStatus()

  }

  GetCameraBrands() {
    this.server.GetCameraBrandDetails().subscribe((response: any) => {
      console.log(response)
      var temp: any[] = []
      if (response.success) {
        response.message.forEach((element: any, id: number) => {
          temp.push({ text: element, id: id })

        });
      }
      console.log(temp)

      this.cameraBrandList = of(temp)
    })
  }
  keytab(event: any) {
    console.log(event.target.parentNode)
    let element = event.target.parentElement.nextElementSibling.children[0]; // get the sibling element
    console.log(element)
    if (element == null)  // check if its null
      return;
    else
      element.focus();   // focus if not null
  }

  ViolImages5meter(data: any) {

    //  NgImageSliderServi
    this.Images = []
    data.five_meter.images.forEach((obj: any, index: number) => {
      console.log(obj)
      this.Images[index] = {
        src: this.IP + '/fivemeter_image/' + obj.img_name,

        thumb: this.IP + '/fivemeter_image/' + obj.img_name,
        caption: obj.img_name,

      }
    })

    this.open(0)
    console.log(this.Images)

  }
  open(index: number): void {
    // open lightbox
    console.log('opening lightbox')
    this._lightbox.open(this.Images, index);
  }

  FlasherImage(data: any) {

    //  NgImageSliderServi
    this.flasherImages = []

    if (data.magnetic_flasher.flasher_image)
      this.flasherImages[0] = {
        src: this.IP + '/magneticflasher_image/' + data.magnetic_flasher.flasher_image,

        thumb: this.IP + '/' + data.magnetic_flasher.img_name,
        caption: data.magnetic_flasher.img_name,

      }

    this.openFIm()
    console.log(this.Images)

  }
  openFIm(): void {
    // open lightbox
    console.log('opening lightbox')
    this._lightbox.open(this.flasherImages, 0);
  }



  ModifyData(data: any) {

    data.forEach((panel: any) => {
      console.log(panel.riro_data[0], 'panel.riro_data[0]')
      let temp: any = {}
      let temp2: any = {}
      if (panel.riro_data.length == 1) {
        if (panel.riro_data[0].rack_process == 'rack_in') {
          temp = panel.riro_data[0]
          panel.riro_data[0] = null
          panel.riro_data[1] = temp;
        }
        else if (panel.riro_data[0].rack_process == 'maintenance') {
          temp = panel.riro_data[0]
          panel.riro_data[0] = null
          panel.riro_data[1] = null
          panel.riro_data[2] = temp;
        }
        else {
          panel.riro_data[1] = null
          panel.riro_data[2] = null
        }
      }

      else {
        if (panel.riro_data[0].rack_process == 'rack_in' && panel.riro_data[1].rack_process == 'rack_out') {
          temp = panel.riro_data[0]
          panel.riro_data[0] = panel.riro_data[1]
          panel.riro_data[1] = temp;
          panel.riro_data[2] = null
        }
        else if (panel.riro_data[0].rack_process == 'rack_in' && panel.riro_data[1].rack_process == 'maintenance') {
          temp = panel.riro_data[0]
          temp2 = panel.riro_data[1]
          panel.riro_data[0] = {}
          panel.riro_data[1] = temp
          panel.riro_data[2] = temp2
          // panel.riro_data[0] = panel.riro_data[1]
          // panel.riro_data[1] = temp;
        }
        else if (panel.riro_data[1].rack_process == 'rack_in' && panel.riro_data[0].rack_process == 'maintenance') {
          temp = panel.riro_data[0]
          temp2 = panel.riro_data[1]
          panel.riro_data[0] = null
          panel.riro_data[1] = temp2
          panel.riro_data[2] = temp
          // panel.riro_data[0] = panel.riro_data[1]
          // panel.riro_data[1] = temp;
        }
        else if (panel.riro_data[0].rack_process == 'maintenance' && panel.riro_data[1].rack_process == 'rack_out') {
          temp = panel.riro_data[0]
          temp2 = panel.riro_data[1]
          panel.riro_data[0] = temp2
          panel.riro_data[1] = null
          panel.riro_data[2] = temp
          // panel.riro_data[0] = panel.riro_data[1]
          // panel.riro_data[1] = temp;
        }
        else if (panel.riro_data[1].rack_process == 'maintenance' && panel.riro_data[0].rack_process == 'rack_out') {

          temp2 = panel.riro_data[1]

          panel.riro_data[1] = null
          panel.riro_data[2] = temp2
          // panel.riro_data[0] = panel.riro_data[1]
          // panel.riro_data[1] = temp;
        }
        else {
          panel.riro_data[2] = null
          console.log("length 2 else condition")
        }
      }



     
    });
    console.log('modified temp data', data)
    return data;
    // this.sliceData()

    console.log('modified temp data', data)

  }

  SortLivewise(data: any) {
   data.forEach((element:any,index:number) => {
  //  if(index%2!=0){
  //     data[index].isolation_status='isolated'
  //  }    
   });
    for (let index1 = 0; index1 < data.length; index1++) {
      data[index1].isbreak=false

      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if ((!data[index1].live_status && data[index2].live_status)) {

          var temp = data[index1]
          data[index1] = data[index2]
          data[index2] = temp
        }
        else if(!(data[index1].isolation_status=='isolated') && data[index2].isolation_status=='isolated'){
          var temp = data[index1]
          data[index1] = data[index2]
          data[index2] = temp
        }
        else{
          continue
        }
      }
    }
    var index1 = 0;
    var subcount=0
    while (index1 < data.length) {
      const element = data[index1];
      const currentActiveJob = data[index1].sl_no
      var tempi = index1 
      subcount=1
      data[index1]
      data[index1].subCount=1
      for (let j = index1 + 1; j < data.length; j++) {
        const subjob = data[j];
        if (subjob.sl_no === currentActiveJob) {
          tempi++
          subcount++
          console.log('matched ',j)
          var tempsub = data[tempi]
          data[tempi] = subjob
          data[j] = tempsub
          data[tempi].subCount=subcount.toString()
        }

      }
      data[tempi].isbreak=true

      console.log(tempi)

      index1=tempi+1
      for (let index1 = tempi+1; index1 < data.length; index1++) {
        for (let index2 = index1 + 1; index2 < data.length; index2++) {
          if ((!data[index1].live_status && data[index2].live_status)) {
  
            var temp = data[index1]
            data[index1] = data[index2]
            data[index1]=temp
            data[index2] = temp
          }
          else if(!(data[index1].isolation_status=='isolated') && data[index2].isolation_status=='isolated'){
            var temp = data[index1]
            data[index1] = data[index2]
            data[index2] = temp
          }
          else{
            continue
          }
        }
      }
      index1=tempi+1
      // console.log('subjobs grouping  locic outer')

    



    }
    return data




  }


  AddSubJob(subjob: any, data: any) {
    this.selectedRiro = data
    this.mainJobForm.get('cameraname').setValue(data.data.camera_name)
    this.mainJobForm.get('cameraip').setValue(data.data.ip_address)
    //this.mainJobForm.get('jobDetails').setValue(data.data.ip_address)
    this.mainJobForm.get('type').setValue(data.type)
    this.mainJobForm.get('tagname').setValue(data.tagname)

    this.mainJobForm.get('job_description').setValue(data.job_description)
    this.mainJobForm.get('area').setValue(data.area)
    this.mainJobForm.get('isolating_locations').setValue(data.isolating_locations)
    this.mainJobForm.get('plant').setValue(data.plant)

    this.mainJobForm.get('department').setValue(data.department)
    this.mainJobForm.get('board').setValue(data.board_name ? data.board_name : '')
    this.mainJobForm.get('plant').setValue(data.plant)
    this.mainJobForm.get('panel_no').setValue(data.data.panel_data.panel_id)
    //need to clarify
    this.mainJobForm.get('no_of_isolating_points').setValue(data.no_of_isolating_points)





    this.modalService.open(subjob, { size: 'lg' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      //  this.roiNameControl.setValue(null)
      //  this.OnAddingNewROI()
      // this.download = '',
      //   this.isalert = false

      console.log('cancel')
      this.AddCameraForm.reset()
      this.isFail = false
      this.isSuccess = false
      this.isLoading = false
      // this.newROIPoints.splice(0,this.newROIPoints.length)
      // this.OnAddingNewROI()
    }, (reason: any) => {
      console.log('submit')
      this.isLoading = false
      /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // this.download = '',
      //   this.isalert = false
      this.AddCameraForm.reset()
      this.isFail = false
      this.isSuccess = false

        ;
    }
    )
  }
  
  ConveyorImage(modal:any,data:any,field:any){
    this.selectedRiro=data

    this.selectedField=field
    this.conveyorImage=of('')
    var  obj={
      id:data._id.$oid,
      rtsp_url:data.data.rtsp_url
    }
    
    this.modalService.open(modal,{size:'xl'})
    this._lightBoxConfig.containerElementResolver = (doc: Document) => doc.getElementById('conveyorImg');
  
    var img=document.getElementById('jobImg')
    img.classList.add('loading')
    this.server.GetConveyorImg(obj).subscribe((response:any)=>{
      if(response.success){
        img.classList.remove('loading')

        console.log(response)
        this.conveyorImage=of(response.message.image_name)
      }
      else{
        img.classList.remove('loading')

      this.server.notification(response.message)
      }
    },
    Err=>{
      this.server.notification('Something went wrong,Retry')
    })
 
  }
  
  getConveyorImg(){
    var img=document.getElementById('jobImg')
    img.classList.add('loading')
    var  obj={
      id:this.selectedRiro._id.$oid,
      rtsp_url:this.selectedRiro.data.rtsp_url
    }
    this.server.GetConveyorImg(obj).subscribe((response:any)=>{
      if(response.success){
        img.classList.remove('loading')

        console.log(response)
        this.conveyorImage= of(response.message.image_name)
      }
      else{
        img.classList.remove('loading')

        this.server.notification(response.message)
      }
    })
 
  }

  







  



  ngOnDestroy(): void {
    clearInterval(this.Interval)
    this.modalService.dismissAll()
  }
}
