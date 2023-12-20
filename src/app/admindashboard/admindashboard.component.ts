import { Component } from '@angular/core';
import { ExportService } from '../export-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  constructor(
    private exportService: ExportService,
    public router:Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  exportToExcel() {
    this.exportService.triggerExportToExcel();
  }

  ngOnInit(): void {}
  dropdownOpen = false;
username: string = this.formatUsername(localStorage.getItem('username') || '');

private formatUsername(username: string): string {
    
    const match = username.match(/^[a-zA-Z]+/);
    if (match) {
      return match[0].toLowerCase().charAt(0).toUpperCase() + match[0].toLowerCase().slice(1);
    }
    return username; 
  }
navigateToLink() {
  this.router.navigate(['/adminDashboard']);
}

  logout(){
    console.log("logout button clicked")
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '310px',
    data: { message: 'Are you sure you want to Logout ?' }
  });
 
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.router.navigateByUrl("");
      this.snackBar.open("Thank You, Logout Successfully..!", 'Close', { duration: 3000 });
       sessionStorage.clear();
       localStorage.clear();
    } else {
      console.log('User clicked No or closed the dialog');
    }
  });
  }
  changePassword() {
  const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
    width: '400px',
    disableClose: true, 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
  
  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  showDropdown() {
    this.dropdownOpen = true;
  }
  
  hideDropdown() {
    this.dropdownOpen = false;
  }
}
