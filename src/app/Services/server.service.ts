import { DatePipe } from "@angular/common";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpXsrfTokenExtractor,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { Observable, retry, Subject } from "rxjs";
import { Interval } from "chart.js/dist/scales/scale.time";
@Injectable({
  providedIn: "root",
})
export class ServerService {
  IP: string;
  delay: number;
  relayDelay: number;
  dashboardInterval: number;
  jobsheetInterval: number;
  logInterval: number;
  liveViolInterval: any;
  ccLiveInterval: any;
  raLiveInterval: any;
  ppeLiveInterval: any;
  aiSolutions: any = {
    RA: "Restricted Area",
    PPE: "PPE",
    TC: "Traffic Count",
    CR: "Crowd Count",
  };
 secretKey:string="docketrun-944"
  CameraSettingsChanges: Subject<boolean> = new Subject();
  isCollapse: Subject<boolean> = new Subject();

  constructor(
    public http: HttpClient,
    public snackbar: MatSnackBar,
    public datePipe: DatePipe
  ) {
    var res = this.loadConfigFile("assets/config.json");
    res = JSON.parse(res);
    this.IP = res.IP;
    this.delay = res.hooterDelay;
    this.relayDelay = res.relayDelay;
    this.dashboardInterval = res.dashboardInterval;
    this.jobsheetInterval = res.jobSheetStatusInterval;
    this.logInterval = res.logInterval;
  }

  JobSheetUpload(file: any): Observable<HttpResponse<any>> {
    // var headers=new HttpHeaders({'Content-Type':'multipart/FormData'})
    // headers.append('Access-Control-Allow-Origin', '*')
    return this.http.post<any>(this.IP + "/upload_file", file, {
      withCredentials: true,
    });
  }

  UploadCameraIPsFile(file: any) {
    return this.http.post(this.IP + "/upload_cameras_excel", file, {
      withCredentials: true,
    });
  }
  TestCameraIps() {
    return this.http.get(this.IP + "/get_camera_status_excel");
  }

  DownloadCameraSheet() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    });
    return this.http.get(this.IP + "/download_camera_status_sheet", {
      headers: headers,
      observe: "body",
      responseType: "arraybuffer",
    });
  }

  DeleteJobPanel(data: any) {
    return this.http.post(this.IP + "/delete_panel", data);
  }
  DeleteRiroJob(data: any) {
    return this.http.get(this.IP + "/delete_riro_data/" + data);
  }

  EditRiroJob(data1: any) {
    return this.http.post(this.IP + "/edit_riro_data", { data: data1 });
  }

  GetRiroHistoryByPanel(data: any) {
    return this.http.post(this.IP + "/riro_all_jobs_data_by_panel_id", data);
  }
  AddJobPanelByRtsp(data: any) {
    return this.http.post(this.IP + "/add_panel_rtsp", data);
  }
  AddJobPanelByIp(data: any) {
    return this.http.post(this.IP + "/add_panel_ip", data);
  }
  GetNewJobData(id: any, imagename: string) {
    return this.http.get(this.IP + "/get_panel_data3/" + id + "/" + imagename);
  }
  SampleExcelDownload() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    });

    return this.http.get(this.IP + "/get_samplefile", {
      headers: headers,
      observe: "response",
      responseType: "arraybuffer",
    });
  }
  loadConfigFile(filepath: any) {
    const JSON = this.readConfigFile(filepath, "application/json");
    return JSON;
  }
  readConfigFile(filepath: any, mimeType: any) {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", filepath, false);
    if (mimeType != null) {
      if (xmlRequest.overrideMimeType) {
        xmlRequest.overrideMimeType(mimeType);
      }
      xmlRequest.send();
      if (xmlRequest.status) {
        return xmlRequest.response;
      } else {
        return null;
      }
    }
  }
  CheckLicense() {
    return this.http.get(this.IP + "/check_license");
  }

  GetJobSheet() {
    return this.http.get(this.IP + "/multiisolation");
  }

  GetJobSheetDataByfilter(plants: any[], area: any[], panel: any[]) {
    return plants.length > 0 && area.length === 0 && panel.length === 0
      ? this.http.post(this.IP + "/plant_wise", { plant: plants })
      : plants.length > 0 && area.length > 0 && panel.length === 0
      ? this.http.post(this.IP + "/area_wise", { plant: plants, area: area })
      : plants.length > 0 && area.length > 0 && panel.length > 0
      ? this.http.post(this.IP + "/panel_wise", {
          plant: plants,
          area: area,
          panel: panel,
        })
      : this.http.get(this.IP + "/multiisolation");
  }

  GetPanelCameraData(id: string, imageName: string) {
    return this.http.get(this.IP + "/get_panel_data1/" + id + "/" + imageName);
  }
  GetJobsheetStatus() {
    return this.http.get(this.IP + "/get_job_sheet_status");
  }
  GetRACameraData(id: string) {
    return this.http.get(this.IP + "/get_ra_camera_details/" + id);
  }

  ResetJobsheet() {
    return this.http.get(this.IP + "/reset_jobsheet");
  }
  CreateJobsheetExcel() {
    return this.http.get(this.IP + "/create_excel");
  }

  CreateViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excel", data);
  }

  CreateRAViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelRA", data);
  }

  CreatePPEViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelPPE", data);
  }

  CreateCCViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelCRDCNT", data);
  }

  DownloadViolationExcel() {
    return this.http.get(this.IP + "/violation_excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }
  DownloadRAViolationExcel() {
    return this.http.get(this.IP + "/violation_excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  DownloadJobsheet() {
    return this.http.get(this.IP + "/excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  //camera apis
  AddCameraDetails(details: any) {
    return this.http.post(this.IP + "/add_camera", details);
  }
  DeleteCameraDetails(id: string) {
    return this.http.get(this.IP + "/delete_ra_camera/" + id);
  }
  AddRACamerabyRtsp(details: any) {
    return this.http.post(this.IP + "/add_camera_rtsp", details);
  }

  EditCamera(details: any) {
    return this.http.post(this.IP + "/edit_camera", details);
  }

  //alarm apis

  EditAlarm(details: any) {
    return this.http.post(this.IP + "/edit_alarmdetails", details);
  }

  //sensgiz violation details

  GetSensegizViol() {
    return this.http.get(this.IP + "/get_coin_violationData");
  }

  //camera analytics api
  AddROI(data: any) {
    return this.http.post(this.IP + "/add_roi", data);
  }
  UpdateCameraFeedImage(id: any) {
    return this.http.get(this.IP + "/CameraIMAGE/" + id);
  }
  AddFireSmokeToFrame(data: any) {
    return this.http.post(this.IP + "/add_firesmoke", data);
  }
  DeleteFireSmokeFrame(data: any) {
    return this.http.post(this.IP + "/delete_firesmoke", data);
  }

  EditROI(data: any) {
    return this.http.post(this.IP + "/edit_roi", data);
  }
  

  AddCrowdCount(data: any) {
    //192.168.1.80:5000/add_tc_data

    http: return this.http.post(this.IP + "/add_cr_data", data);
  }

  AddTCData(data: any) {
    return this.http.post(this.IP + "/add_tc_data", data);
  }

  EditCCData(data: any) {
    return this.http.post(this.IP + "/edit_crdata", data);
  }

  deleteCCData(data: any) {
    return this.http.post(this.IP + "/delete_cr_data", data);
  }
  deleteCCFrameData(data: any) {
    return this.http.post(this.IP + "/delete_crfullframe_data", data);
  }

  deleteTCData(data: any) {
    return this.http.post(this.IP + "/delete_tc_data", data);
  }
  AddSpillageRoi(data: any) {
    return this.http.post(this.IP + "/add_spillage_roi", data);
  }
  EditSpillageData(data: any) {
    return this.http.post(this.IP + "/edit_spillage_roi", data);
  }
  DeleteSpillageRoi(data: any) {
    return this.http.post(this.IP + "/delete_spillage_roi", data);
  }
  LatestData(violtype: any, cameraname: string) {
    // return this.http.get(this.IP+'/latest_data')
    console.log(violtype, cameraname);
    return cameraname && !violtype
      ? this.http.get(this.IP + "/latest_data_camera_name/" + cameraname)
      : !cameraname && violtype
      ? this.http.get(this.IP + "/latest_data_violation_type/" + violtype)
      : cameraname && violtype
      ? this.http.get(this.IP + "/latest_data/" + cameraname + "/" + violtype)
      : this.http.get(this.IP + "/latest_data_violation_type");
  }

  DatewiseData(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/datewise", {
      from_date: fromDate,
      to_date: toDate,
    });
  }

  ppeViolCountCamwise() {
    return this.http.get(this.IP + "/cam_wise_PPE_violations_details");
  }

  CCCountCamwise() {
    return this.http.get(this.IP + "/cam_wise_CR_violations_details");
  }

  RAViolCountCamWise() {
    return this.http.get(this.IP + "/cam_wise_RA_violations_details");
  }

  StartApplication() {
    return this.http.get(this.IP + "/create_phaseone_config");
  }
  SetMockDrill(flag: any) {
    return this.http.get(this.IP + "/set_mockdrill/" + flag);
  }

  StartFireSmoke(data: any) {
    return this.http.post(this.IP + "/start_firesmoke", data);
  }

  StopFireSmoke() {
    return this.http.get(this.IP + "/stop_firesmokeapp");
  }
  GetMockDrillStatus() {
    return this.http.get(this.IP + "/set_mockdrill");
  }
  StartSpillageApp(configData: { media_type: string; data_interval: number }) {
    return this.http.post(this.IP + "/start_spillage", configData);
  }

  StopSpillageApp() {
    return this.http.get(this.IP + "/stop_spillageapp");
  }
  // StartApplication(){
  //   return this.http.get(this.IP+'/create_common_config')
  // }

  StartESIApp() {
    return this.http.get(this.IP + "/create_esi_config");
  }

  ConfigRtsp(option: any) {
    return this.http.get(this.IP + "/set_rtsp_flag/" + option);
  }

  StopESIApp() {
    return this.http.get(this.IP + "/stop_app_esi");
  }

  dateTransform(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");
  }

  dateTransformbyPattern(date: Date, pattern: string) {
    return this.datePipe.transform(date, pattern);
  }

  getCameras() {
    return this.http.get(this.IP + "/get_ra_camera_details");
  }

  GetCameraDetails() {
    return this.http.get(this.IP + "/camera_details");
  }

  GetRACameraDetails() {
    return this.http.get(this.IP + "/camera_detailsRA");
  }
  GetPPECameraDetails() {
    return this.http.get(this.IP + "/camera_detailsPPE");
  }
  GetCCCameraDetails() {
    return this.http.get(this.IP + "/camera_detailsCRDCNT");
  }
  GetTCCameraDetails() {
    return this.http.get(this.IP + "/camera_detailsTC");
  }
  getCameraExcelSample() {
    const headers = new HttpHeaders({
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      //   'Accept-Language': 'en-US,en;q=0.5',
      //  ' Accept-Encoding':' gzip, deflate',
    });
    return this.http.get(this.IP + "/get_samplefileFORCHECKCAMERA", {
      observe: "response",
      headers: headers,
      responseType: "blob",
    });
  }
  DeleteRoi(data: any) {
    return this.http.post(this.IP + "/delete_roi", data);
  }

  GetAreasByPlant(plant: any) {
    return this.http.post(this.IP + "/get_area_details", { plant: plant });
  }

  GetPlantList() {
    return this.http.get(this.IP + "/get_plant_details");
  }

  GetPanelsByArea(area: any) {
    return this.http.get(this.IP + "/panel_wise/area/" + area);
  }

  GetCameraBrandDetails() {
    return this.http.get(this.IP + "/get_camera_brand_details");
  }

  LiveViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    //this.IP=<string>localStorage.getItem('changedIP')
    // return cameraId && !violType  ? this.httpClient.get(this.IP + "/jsw/live_data/cameraname/" + cameraId) :!cameraId && violType ? this.httpClient.get(this.IP + "/jsw/live_data/violation_type/"+violType):cameraId && violType? this.httpClient.get(this.IP + "/jsw/live_data/"+cameraId+'/'+violType):this.httpClient.get(this.IP + "/jsw/live_data")
    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP +
            "/live_data1/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1/cameraname/" + cameraName)
      : this.http.get(this.IP + "/live_data1");
  }
  LiveRAViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1RA/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1RA/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP + "/live_data1RA/" + cameraName + "/" + page + "/" + size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1RA/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1RA/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1RA/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1RA/" + cameraName)
      : this.http.get(this.IP + "/live_data1RA");
  }
  LiveCCViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1CC/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1CC/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP + "/live_data1CC/" + cameraName + "/" + page + "/" + size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1CC/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1CC/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1CC/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1CC/" + cameraName)
      : this.http.get(this.IP + "/live_data1CC");
  }

  LivePPEViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1PPE/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1PPE/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP + "/live_data1PPE/" + cameraName + "/" + page + "/" + size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1PPE/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(
          this.IP + "/live_data1PPE/pagination/" + page + "/" + size
        )
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1PPE/" + cameraName)
      : this.http.get(this.IP + "/live_data1PPE");
  }
  LiveTCViolationData() {}
  GetLatestRAData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataRA/" + camera_name)
      : this.http.get(this.IP + "/latest_dataRA");
  }
  GetLatestPPEData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataPPE/" + camera_name)
      : this.http.get(this.IP + "/latest_dataPPE");
  }
  GetLatestCCData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataCC/" + camera_name)
      : this.http.get(this.IP + "/latest_dataCC");
  }
  GetPPEFiltersData() {
    return this.http.get(this.IP + "/PPEviolationPercentage");
  }
  ChangePPEFiltersData(data: any) {
    return this.http.post(this.IP + "/PPEviolationPercentage", data);
  }

  GetCameraNames() {
    return this.http.get(this.IP + "/camera_details");
  }

  DatewiseViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);
    console.log(fromD, toD);
    console.log(page, size);
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    console.log(violType);
    console.log(this.IP + "/datewise/" + cameraName + "/" + page + "/" + size);
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violation/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violation/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewise/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violation", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violation/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewise/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewise/" + cameraName, body)
      : this.http.post(this.IP + "/datewise", body);
  }

  DatewiseRAViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);
    console.log(fromD, toD);
    console.log(page, size);
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    console.log(violType);
    console.log(
      this.IP + "/datewiseRA/" + cameraName + "/" + page + "/" + size
    );
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewiseRA_violation/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewiseRA_violation/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewiseRA/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationRA", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationRA/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewiseRA/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewiseRA/" + cameraName, body)
      : this.http.post(this.IP + "/datewiseRA", body);
  }
  DatewisePPEViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);
    console.log(fromD, toD);
    console.log(page, size);
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    console.log(violType);
    console.log(
      this.IP + "/datewisePPE/" + cameraName + "/" + page + "/" + size
    );
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violationPPE/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationPPE/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewisePPE/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationPPE", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationPPE/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewisePPE/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewisePPE/" + cameraName, body)
      : this.http.post(this.IP + "/datewisePPE", body);
  }
  DatewiseCCViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);
    console.log(fromD, toD);
    console.log(page, size);
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    console.log(violType);
    console.log(
      this.IP + "/datewiseCC/" + cameraName + "/" + page + "/" + size
    );
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violationCC/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationCC/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewisePPE/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationCC", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationCC/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewiseCC/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewiseCC/" + cameraName, body)
      : this.http.post(this.IP + "/datewiseCC", body);
  }
  DeleteViolationData(id: any) {
    return this.http.get(this.IP + "/Deleteviolation/" + id);
  }

  GetViolationList() {
    return this.http.get(this.IP + "/violation_type_details");
  }

  GetRiRoViolationData(data: any) {
    return this.http.post(this.IP + "/riro_violation_data", data);
  }
  VerifyViolation(id: string, flag: any) {
    return this.http.get(
      this.IP + "/violation_verification/" + id + "/" + flag
    );
  }

  notification(message: string, action?: string, duration?: number) {
    console.log("snackbar");
    this.snackbar.open(message, action ? action : "", {
      duration: duration ? duration : 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  // GetJobsheetDataByArea(plant:any,area:any){
  //   return this.http.post(this.IP+'/area_wise',{plant:plant,area:area})
  // }

  UpdatePanelRoi(data: any) {
    return this.http.post(this.IP + "/update_panel_roi_id", data);
  }

  AddPanelRoi(data: any) {
    return this.http.post(this.IP + "/add_panel_roi_id", data);
  }

  DeleteMechJobs(id: any) {
    return this.http.get(this.IP + "/delete_mechanical_job/" + id);
  }

  UpdateCameraAnalytics(id: any, value: any) {
    return this.http.get(this.IP + "/analytics_status/" + id + "/" + value);
  }

  GetPanelsList(plant: any, area: any) {
    return this.http.post(this.IP + "/get_panel_details", {
      plant: plant,
      area: area,
    });
  }

  ResetLiveCount() {
    return this.http.get(this.IP + "/reset_live_data_count");
  }

  GetCamerasStatus() {
    return this.http.get(this.IP + "/get_cam_status_enable_cam_count");
  }
  GetViolationDetails() {
    return this.http.get(this.IP + "/get_solution_data_details");
  }

  GetECSolutionCount() {
    return this.http.get(this.IP + "/get_all_solns_enable_cam_details");
  }

  GetSolutionCameraDetails() {
    return this.http.get(this.IP + "/get_solution_data_details");
  }
  DisableCamDetails() {
    return this.http.get(this.IP + "/disable_camera_details");
  }

  GetLiveViolationCount() {
    return this.http.get(this.IP + "/get_current_date_violation");
  }
  GetTotaliveViolationsDetails() {
    return this.http.get(this.IP + "/current_date_violations_count");
  }
  GetNotWorkingCameraDetails() {
    return this.http.get(this.IP + "/get_not_working_camera_details");
  }

  GetPPEViolCountCamWise() {
    return this.http.get(this.IP + "/cam_wise_PPE_violations_details");
  }
  GetPPEViolationDetails(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_ppe_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }
  GetTotalViolDetailsDatewise(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }

  GetRAViolationsDetails(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_ra_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }
  GetCCCamwiseDateWise(fromDate: any, toDate: any) {
    return this.http.get(this.IP + "/cam_wise_CR_violations_details");
  }
  GetCCLiveDataCamwise() {
    return this.http.get(this.IP + "/cam_wise_CR_violations_details");
  }
  GetViolationCountDatewise(fromDate: any, toDate: any, violationType?: any) {
    console.log("datewise", fromDate, toDate);
    return this.http.post(this.IP + "/date_wise_given_violation_count", {
      from_date: fromDate,
      to_date: toDate,
      violation_type: violationType ? [violationType] : [],
    });
  }
  CheckApplicationStatus() {
    return this.http.get(this.IP + "/check_process");
  }

  GetConveyorImg(data: any) {
    return this.http.post(this.IP + "/check_mechanical_job", data);
  }

  stopApp() {
    // return this.http.get(this.IP+'/stop_app_common')
    return this.http.get(this.IP + "/stop_phaseoneapp");
  }
  StartSmartApp() {
    return this.http.get(this.IP + "/create_smart_config");
  }

  StopSmartApp() {
    return this.http.get(this.IP + "/stop_smart_record");
  }

  AddReportDetails(data: any) {
    return this.http.post(this.IP + "/insert_email_details", data);
  }

  GetLicenseDetails() {
    return this.http.get(this.IP + "/license_count");
  }
  AddMechJobByExcel(data: FormData) {


    return this.http.post(this.IP + "/addcamerausingexcel", data);
  }

  ModifyRtspString(inputString: any) {
    // Create a regular expression that matches all characters to be replaced
    let replacements: any = {
      ":": "%3A",
      "/": "%2F",
      "@": "%40",
      "?": "%3F",
      "&": "%26",
      "=": "%3D",
    };
    let resultString = inputString;

    for (const key in replacements) {
      // if (replacements.hasOwnProperty(key)) {
      resultString = resultString.split(key).join(replacements[key]);
      // }
    }

    return resultString;
  }

  AddParkingROI(data:any){
    return this.http.post(this.IP + "/add_Parking_roi", data);
  }
  AddTraffic_JamROI(data:any){
    return this.http.post(this.IP + "/add_TrafficJam_roi", data);
  }

  DeleteParkingRoi(data: any) {
    return this.http.post(this.IP + "/delete_parkingRoi", data);
  }

  DeleteTraffic_JamRoi(data: any) {
    return this.http.post(this.IP + "/delete_TrafficJamRoi", data);
  }

  EditParkingROI(data:any){
    return this.http.post(this.IP+"/edit_Parking_roi",data);
  }
  EditTraffic_JamROI(data:any){
    return this.http.post(this.IP+"/edit_TrafficJam_roi",data);
  }
}
