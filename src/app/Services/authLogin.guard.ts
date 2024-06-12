import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
  
})
export class AuthGuardLogin implements CanActivate {
  constructor(public router:Router,private location:Location){
    console.log('authguard login')
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log(localStorage.getItem('session'))
      console.log(this.location)
    return localStorage.getItem('session')? this.router.createUrlTree(['app/dashboard']):true;
  }
  
}
