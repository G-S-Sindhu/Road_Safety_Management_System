import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import crypto from "crypto-js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: any;
  isLoading: boolean = false;
  secretKey: string = "docketrun@123";
  fail: boolean = false;
  authForm:FormGroup=new FormGroup({
    userName:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  showPassword:boolean = false
 
  constructor(private Router: Router) {}

  ngOnInit(): void {}

  OnSubmit() {
    this.isLoading = true;
   
   if( this.authForm.get('userName').value=='admin'&&this.authForm.get('password').value=='admin'){
      this.isLoading=false
      var userData = JSON.stringify({
        userName: this.authForm.get('userName').value,
        password: this.authForm.get('userName').value,
      });
      var encodedUserData = crypto.AES.encrypt(
        userData,
this.secretKey      );
      localStorage.setItem("session", encodedUserData.toString())
      this.Router.navigate(['app/CameraSettings'])
   }
   else{
    this.isLoading=false
    this.fail=true
   }

   
        
  }

  ToNextField(id:string){
      document?.getElementById(id).focus(); // get the sibling element
     
    
  }
}
