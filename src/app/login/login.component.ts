import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make HTTP requests
import { Router } from '@angular/router'; // Import Router for navigation
import { CheckService } from '../Services/check.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { api } from 'src/assets/api/url';

const url=`${api.URL_ADMIN}`;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, // Inject Router for navigation
    private checkService:CheckService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToLink() {

  this.router.navigate(['']);
}

  ngOnInit(): void {}

   onSubmit(): void {
    
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      sessionStorage.clear();
      localStorage.clear();
      
      this.http
     .post<any>(url+'authenticate', { username, password }).subscribe(

        (response) => {
            if (response.jwt && response.jwt !== 'No') {
            
            localStorage.setItem('username', username);
            let token = 'Bearer ' + response.jwt;
            sessionStorage.setItem('token', token);
            console.log('Login successful', response);
            console.log(token);
            this.snackBar.open("Welcome "+username+",\nYou Logged In Successfully..!", 'Close', { duration: 3000 });
            

            let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
            let role: string = decodedJWT.role;
            let user:string=decodedJWT.sub;
              sessionStorage.setItem('user',user.trim());
            sessionStorage.setItem('role',role);
            console.log("decoded username",user);
            console.log("decoded role", role);
           const check=this.checkService.checkMentor();
              if(check){
                this.router.navigate(['/dashboard']); // Replace with your route
                return;
              }
              else if(this.checkService.checkAdmin()){
                this.router.navigate(['/adminDashboard'])
                return;

              }

            // Redirect to a dashboard or any other page upon successful login
            }else{
              this.loginFailed = true;
            }
          },
          (error) => {
            console.error('Login failed', error);
            this.loginFailed = true;
          }
        );
    }

   }

}

 