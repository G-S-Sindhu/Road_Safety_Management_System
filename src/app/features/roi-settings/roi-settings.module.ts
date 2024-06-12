import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CommonModules } from "src/app/common/common.module";
import 'fabric'
import { RouterModule, Routes } from "@angular/router";
import { RoiSettingsComponent } from "./roi-settings.component";

const routes:Routes=[{path:'',component:RoiSettingsComponent}]
@NgModule({
    declarations:[RoiSettingsComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule],

})

export class ROIEditModule{

}