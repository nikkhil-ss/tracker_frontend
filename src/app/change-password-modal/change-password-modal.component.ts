import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { api } from 'src/assets/api/url';

const url=`${api.URL_ADMIN}`;

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  oldPassword:any;
  newPassword:any;
  confirmPassword: any;
  showPassword: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordModalComponent>) {}

  ngOnInit(): void {}
  
  showAlert = false;
  alertMessage = '';

  showAlertModal(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
  onCloseAlert() {
    this.showAlert = false;
    this.dialogRef.close();
  }
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.showAlertModal('New password and confirm password do not match')
      return;
    }
    const requestBody = {
      username: sessionStorage.getItem('user'),
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    console.log("inside change password")
    console.log("requestbody",requestBody);
    axios.post(url+'updatePassword', requestBody)
      .then(response => {
        console.log('Password updated successfully', response.data);
        this.showAlertModal('Password updated successfully');
      })
      .catch(error => {
        console.error('Error updating password', error);
        this.showAlertModal(error.response.data.jwt);
      })
    }

  close() {
    this.dialogRef.close();
  }
}
