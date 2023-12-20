import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SearchServiceService } from '../search-service.service';
import { Interview } from '../Models/interview';
import { api } from 'src/assets/api/url';

const url2=`${api.URL_INTERVIEW}`;
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent {
 
  candidates: Interview[] = [];
  showAttachmentModal: boolean = false;
  selectedAttachment: string | SafeResourceUrl = '';
  searchText: string = '';
  filteredCandidates: any[] = [];
  editedValue: any;
  mentorName: any;
  url = url2+`byMentorName/`;


  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,  // Inject MatDialog
    public searchservice:SearchServiceService
  ) { }

  filterCandidates() {
    console.log('Filtering candidates. Search Text:', this.searchText);

    if (!this.searchText || this.searchText.trim() === '') {
      // If search text is empty, show all candidates
      this.searchservice.filteredCandidates = this.candidates;
    } else {
      // Filter candidates based on search text
      this.searchservice.filteredCandidates = this.candidates.filter((candidate) => {
        // Check if employeeName is not null or undefined before calling toLowerCase()
        const employeeName = candidate.employeeName ? candidate.employeeName.toLowerCase() : '';
        // You can customize this condition to search in specific fields
        return (
          employeeName.includes(this.searchText.toLowerCase()) ||
          (candidate.email && candidate.email.toLowerCase().includes(this.searchText.toLowerCase()))
          // Add more fields as needed
          // ...
        );
      });
    }

    // Log the filtered candidates for debugging
    console.log('Filtered Candidates:', this.searchservice.filteredCandidates);
  }


  clearSearch() {
    this.searchText = '';
    this.filterCandidates(); // Reset to show all candidates
  }

  onSearchTextChange() {
    if (this.searchText.trim() !== '') {
      this.filterCandidates();
    } else {
      // If search text is empty, show all candidates
      this.searchservice.filteredCandidates = this.candidates;
    }
  }

  ngOnInit(): void {
    this.checkData();
    console.log("Hello Mentor view");
    this.mentorName = sessionStorage.getItem('user')?.trim();
    this.url = this.url + this.mentorName;
    this.fetchInterviews();


  }

  makeEditable(candidate: Interview) {
    candidate.isEdit = !candidate.isEdit;
  }


  //save button functionality 
  save(candidate: Interview) {
    this.makeEditable(candidate);
    console.log("from frontend", candidate);
    this.http.post(url2+'create', candidate).subscribe(data => {
      alert("data updated Successfully");
    }, error => console.log(error));


  }

  checkData() {
    console.log("datadfsfh", this.searchservice.filteredCandidates);

  }



  fetchInterviews() {
    // Make an HTTP GET request to your Spring Boot backend API
    this.http.get<Interview[]>(this.url).subscribe(
      (response) => {
        console.log("response", response)
        this.candidates = response;
        this.searchservice.filteredCandidates = this.candidates; // Initialize filtered candidates
        console.log('Interviews:', this.candidates);
      },
      (error) => {
        console.error('Error fetching interviews:', error);
      }
    );
  }

  deleteCandidate(candidate: any) {
    const empId = candidate.empId;
    //const projectCode = candidate.projectCode;

    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete the candidate with empId ${empId}?` }
    });

    // Subscribe to the result of the confirmation dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked 'Yes', perform deletion logic here
        this.performDeleteCandidate(empId);
      } else {
        // User clicked 'No' or closed the dialog, handle accordingly
        console.log('User clicked No or closed the dialog');
      }
    });
  }

  private performDeleteCandidate(empId: Number) {
    // Make an HTTP DELETE request with the correct URL
    this.http.delete(url2+`delete/${empId}`, { responseType: 'text' })
      .subscribe(
        (response) => {
          if (response === 'Interview deleted successfully') {
            // Show a snackbar notification
            this.snackBar.open(`Candidate with empId ${empId} deleted successfully!`, 'Close', { duration: 3000 });

            // Reload the current route
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/view']);
            });
          } else {
            console.error(`Error deleting candidate with empId ${empId}: Unexpected response`);
            // Handle unexpected responses here
          }
        },
        (error) => {
          console.error(`Error deleting candidate with empId ${empId}:`, error);
          // Handle errors here
        }
      );
  }

  openAttachmentModal(attachmentUrl: string) {
    // Display the attachment in the modal
    this.selectedAttachment = this.sanitizeUrl(attachmentUrl);
    this.showAttachmentModal = true;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeAttachment() {
    // Close the modal
    this.showAttachmentModal = false;
    this.selectedAttachment = '';
  }
  openEditDialog(): void {
    // Make an HTTP GET request to your Spring Boot backend API
    this.http.put<Interview[]>(url2+'update', this.candidates).subscribe(
      (response) => {
        this.candidates = response;
        console.log('Interviews:', this.candidates);
      },
      (error) => {
        console.error('Error updating interviews:', error);
      }
    );

  }
  // edit(data:any){
  //   console.log("candidate data:",data.target.innerText);
  //   console.log("fdgf",this.filteredCandidates)
  // }
  editCell(candidate: any) {
    // Set the edited value to the item's value
    this.editedValue = candidate.empId;
    candidate.isEditing = true;
  }

  // saveEditedValue(candidate: any) {
  //   candidate.empId = this.editedValue;
  //   candidate.isEditing = false;
  //   // Send the updated data to the server or perform any other actions
  // }

  saveEditedValue(candidate: any) {
    // Update the candidate's empId with the edited value
    candidate.empId = this.editedValue;
    candidate.isEditing = false;

    // Save the updated data to the database
    const apiUrl = url2+`update`;

    this.http.put<Interview[]>(apiUrl, [candidate]) // Wrap the single candidate in an array
      .subscribe(
        (updatedList: Interview[]) => {
          console.log('Candidate updated successfully.');
          // Handle the updated list here, e.g., update your local list with the new data
          this.searchservice.filteredCandidates = updatedList;
        },
        (error) => {
          console.error('Error updating candidate:', error);
        }
      );
  }
}
