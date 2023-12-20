import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface AuthenticationRequest{
  username: string;
  password: string;
}
import { api } from 'src/assets/api/url';

const url_admin=`${api.URL_ADMIN}`;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  successmsg: string ="";
  errorflag: boolean = true;
  msg = "";
  registrationSuccess = false;

  constructor( private _router: Router, private http : HttpClient){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  username1: string='';
  password1: string='';
  
  user: AuthenticationRequest = {
    username: this.username1,
    password: this.password1

  }

  registerUser() :void {

      const url = url_admin+'register';

      this.http.post<string>(url,this.user, {responseType:'text' as 'json'}).subscribe(
        (response:string) => {
          this.successmsg= response;
          console.log(this.user);
          console.log("success");
          this.msg = "Registration Successful";
          this.registrationSuccess = true;
          this._router.navigate(['login'])
        },
        (error) => {
          console.log("error");
          console.log(this.user);
          console.log(error)
          this.msg = "Failed to register user";
        }
      )

  }
}
