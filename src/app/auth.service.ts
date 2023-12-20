// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private isLoggedInValue:boolean = false;
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  setLoggedIn(value:boolean){
    this.isLoggedInValue = value;
  }

  isLoggedIn():boolean{
    return this.isLoggedInValue;
  
  }
}
