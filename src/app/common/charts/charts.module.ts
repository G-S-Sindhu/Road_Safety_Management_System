import { NgModule } from "@angular/core";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({

    imports:[NgApexchartsModule],
    exports:[BarChartComponent,LineChartComponent],
    declarations:[BarChartComponent,LineChartComponent]
})
export class ChartsModule{

}