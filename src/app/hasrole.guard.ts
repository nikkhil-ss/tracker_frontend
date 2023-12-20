import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { CheckService } from './Services/check.service';



@Injectable({
  providedIn: 'root'
})
export class hasroleGuard implements CanActivate {
  constructor(private router: Router,private checkSerive:CheckService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Check if the user is logged in (you can use your authentication service)
    // const check=this.checkSerive.checkAdmin();
    const check=sessionStorage.getItem('role')=='admin';
    console.log("inside has role----",route.data['role']);
    console.log("checking check value", check)
    if(check){
      this.router.navigate(['/adminDashboard'])
      return true;
    }
    this.router.navigate(['/dashboard']);
    
    alert("Unauthorised Access");
    
    return false; 
   }
}