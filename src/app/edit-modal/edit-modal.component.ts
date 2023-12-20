import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { api } from 'src/assets/api/url';

const url2=`${api.URL_INTERVIEW}`;
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public Interview: any,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    // Handle saving changes here
    // You can access the edited batch using 'this.batch'
    
    // Close the dialog
    
    this.http.put(url2+`update`, this.Interview)
      .subscribe((response) => {
        // Handle the response from the backend here
        console.log('Candidate details updated:', response);

        // Close the dialog
        this.dialogRef.close();
      });
    // this.dialogRef.close();
  }

  onCancel(): void {
    // Handle canceling changes here
    
    // Close the dialog
    this.dialogRef.close();
  }
}
