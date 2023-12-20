import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor() { }

  checkMentor(){
      console.log("checkRole",sessionStorage.getItem('role'));
      if(sessionStorage.getItem('role') ==="mentor"){
        console.log("mentor")
        return true;
      }
      console.log("admin")
      return false;
  }
  checkAdmin(){
    if(sessionStorage.getItem('role')==="admin"){
      console.log("checking admin true")
      return true;
    }
    else {
      console.log("checking admin false")
      return false;
    }
  }
}
