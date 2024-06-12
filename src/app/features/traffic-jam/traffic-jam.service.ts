import { Injectable } from "@angular/core";
import { configService } from "src/app/Services/config.service";

@Injectable({
    providedIn:'platform'
})

export class TrafficJamComponent{

    constructor(private configService:configService){

    }
}