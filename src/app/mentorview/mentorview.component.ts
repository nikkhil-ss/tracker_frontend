import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interview } from '../Models/interview';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchServiceService } from '../search-service.service';
 
//viewing mentor specific candidate
import { api } from 'src/assets/api/url';
 
const url2=`${api.URL_INTERVIEW}`;
 
@Component({
  selector: 'app-mentorview',
  templateUrl: './mentorview.component.html',
  styleUrls: ['./mentorview.component.css'],
})
export class MentorviewComponent implements OnInit {
  candidates: Interview[] = [];
  showAttachmentModal: boolean = false;
  selectedAttachment: string | SafeResourceUrl = '';
  searchText: string = '';
  filteredCandidates: any[] = [];
  editedValue: any;
  selectedValue: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog, // Inject MatDialog
    public searchservice: SearchServiceService
  ) {}
 
  filterCandidates() {
    console.log('Filtering candidates. Search Text:', this.searchText);
 
    if (!this.searchText || this.searchText.trim() === '') {
      // If search text is empty, show all candidates
      this.filteredCandidates = this.candidates;
    } else {
      // Filter candidates based on search text
      this.filteredCandidates = this.candidates.filter((candidate) => {
        // Check if employeeName is not null or undefined before calling toLowerCase()
        const employeeName = candidate.employeeName
          ? candidate.employeeName.toLowerCase()
          : '';
        // You can customize this condition to search in specific fields
        return (
          employeeName.includes(this.searchText.toLowerCase()) ||
          (candidate.email &&
            candidate.email
              .toLowerCase()
              .includes(this.searchText.toLowerCase()))
          // Add more fields as needed
          // ...
        );
      });
    }
 
    // Log the filtered candidates for debugging
    console.log('Filtered Candidates:', this.filteredCandidates);
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
      this.filteredCandidates = this.candidates;
    }
  }
 
  ngOnInit(): void {
    this.fetchInterviews();
    this.checkData();
  }
 
  makeEditable(candidate: Interview) {
    candidate.isEdit = !candidate.isEdit;
  }
 
  save(candidate: Interview) {
    this.makeEditable(candidate);
    console.log('from frontend', candidate);
    this.http.post(url2 + 'create', candidate).subscribe(
      (data) => {
        alert('data updated Successfully');
      },
      (error) => console.log(error)
    );
  }
 
  checkData() {
    console.log('datadfsfh', this.filteredCandidates);
  }
 
  fetchInterviews() {
    // Make an HTTP GET request to your Spring Boot backend API
    this.http.get<Interview[]>(url2 + 'all').subscribe(
      (response) => {
        this.hideloader();
        this.candidates = response;
        this.searchservice.filteredCandidates = this.candidates; // Initialize filtered candidates
        console.log('Interviews:', this.candidates);
      },
      (error) => {
        console.error('Error fetching interviews:', error);
      }
    );
  }
  hideloader() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
 
  deleteCandidate(candidate: any) {
    const empId = candidate.empId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete the candidate with empId ${empId}?`,
      },
    });
 
    // Subscribe to the result of the confirmation dialog
    dialogRef.afterClosed().subscribe((result) => {
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
    this.http
      .delete(url2 + `delete/${empId}`, { responseType: 'text' })
      .subscribe(
        (response) => {
          if (response === 'Interview deleted successfully') {
            // Show a snackbar notification
            this.snackBar.open(
              `Candidate with empId ${empId} deleted successfully!`,
              'Close',
              { duration: 3000 }
            );
 
            // Reload the current route
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/view']);
              });
          } else {
            console.error(
              `Error deleting candidate with empId ${empId}: Unexpected response`
            );
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
    this.http.put<Interview[]>(url2 + 'update', this.candidates).subscribe(
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
 
  //search filter method
 
  search() {
    console.log('Filtering candidates - Search Text:', this.searchText);
    console.log('Filtering candidates - Selected option: ', this.selectedValue);
    if (!this.searchText || this.searchText.trim() === '') {
      // If search text is empty, show all candidates
      this.searchservice.filteredCandidates = this.candidates;
    } else {
      // Filter candidates based on search text
      const lowerCaseSearchText = this.searchText.toLowerCase();
      // console.log("candidates filtering" + this.candidates);
 
      this.searchservice.filteredCandidates = this.candidates.filter(
        (candidate) => {
          if (this.selectedValue === 'employeeName') {
            return (
              candidate.employeeName &&
              candidate.employeeName.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'email') {
            return (
              candidate.email &&
              candidate.email.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'empId') {
            // Strict equality check
            return (
              candidate.empId &&
              candidate.empId.toString().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'accountName') {
            return (
              candidate.accountName &&
              candidate.accountName.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'baselineDate') {
            // Strict equality check
            return (
              candidate.baselineDate &&
              candidate.baselineDate.toString().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'initialBu') {
            return (
              candidate.initialBu &&
              candidate.initialBu.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'accountShadowsDone') {
            return (
              candidate.accountShadowsDone &&
              candidate.accountShadowsDone
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'botpStatus') {
            return (
              candidate.botpStatus &&
              candidate.botpStatus.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'btoAverageQ3Attendance') {
            return (
              candidate.btoAverageQ3Attendance &&
              candidate.btoAverageQ3Attendance
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'bucket') {
            return (
              candidate.bucket &&
              candidate.bucket.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'college') {
            return (
              candidate.college &&
              candidate.college.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'collegeType') {
            return (
              candidate.collegeType &&
              candidate.collegeType.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'currentDayStatus') {
            return (
              candidate.currentDayStatus &&
              candidate.currentDayStatus
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'digiDashboardUpdatedRegularly') {
            // Strict equality check
            return (
              candidate.digiDashboardUpdatedRegularly &&
              candidate.digiDashboardUpdatedRegularly
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'currentInitiativeInvolvedIn') {
            return (
              candidate.currentInitiativeInvolvedIn &&
              candidate.currentInitiativeInvolvedIn
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'currentStatus') {
            return (
              candidate.currentStatus &&
              candidate.currentStatus
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'education') {
            return (
              candidate.education &&
              candidate.education.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'hsCertificationDone') {
            return (
              candidate.hsCertificationDone &&
              candidate.hsCertificationDone
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'leaveAppliedLast3Months') {
            // Strict equality check
            return (
              candidate.leaveAppliedLast3Months &&
              candidate.leaveAppliedLast3Months
                .toString()
                .includes(lowerCaseSearchText)
            );
            // return candidate.leaveAppliedLast3Months.toString().includes(lowerCaseSearchText);
          } else if (this.selectedValue === 'leaveBalance') {
            // Strict equality check
            // return candidate.leaveBalance.toString().includes(lowerCaseSearchText);
            return (
              candidate.leaveBalance &&
              candidate.leaveBalance.toString().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'localGrade') {
            return (
              candidate.localGrade &&
              candidate.localGrade.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'mainProject') {
            return (
              candidate.mainProject &&
              candidate.mainProject.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'mentorName') {
            return (
              candidate.mentorName &&
              candidate.mentorName.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'oceanAttemptedTillDate') {
            return (
              candidate.oceanAttemptedTillDate &&
              candidate.oceanAttemptedTillDate
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'oceanScoreIfAttempted') {
            // Strict equality check
            // return candidate.oceanScoreIfAttempted === parseFloat(lowerCaseSearchText);
            return (
              candidate.oceanScoreIfAttempted &&
              candidate.oceanScoreIfAttempted
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'personReachable') {
            return (
              candidate.personReachable &&
              candidate.personReachable
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'pscRemarks') {
            return (
              candidate.pscRemarks &&
              candidate.pscRemarks.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'qualitativeFeedback') {
            return (
              candidate.qualitativeFeedback &&
              candidate.qualitativeFeedback
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'recruitmentAptitudeScore') {
            // Strict equality check
            return (
              candidate.recruitmentAptitudeScore &&
              candidate.recruitmentAptitudeScore
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'recruitmentCodingScore') {
            // Strict equality check
            return (
              candidate.recruitmentCodingScore &&
              candidate.recruitmentCodingScore
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'recruitmentSwarScore') {
            // Strict equality check
            return (
              candidate.recruitmentSwarScore &&
              candidate.recruitmentSwarScore
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'sapienceAvgLast3Months') {
            // Strict equality check
            // return candidate.sapienceAvgLast3Months  === parseFloat(lowerCaseSearchText);
            return (
              candidate.sapienceAvgLast3Months &&
              candidate.sapienceAvgLast3Months
                .toString()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'subStatus') {
            return (
              candidate.subStatus &&
              candidate.subStatus.toLowerCase().includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'trainingBatchId') {
            return (
              candidate.trainingBatchId &&
              candidate.trainingBatchId
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'trainingScoreFeedback') {
            return (
              candidate.trainingScoreFeedback &&
              candidate.trainingScoreFeedback
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else if (this.selectedValue === 'upskillingWhileOnBench') {
            return (
              candidate.upskillingWhileOnBench &&
              candidate.upskillingWhileOnBench
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          } else {
            return (
              candidate.workDoneLast3Months &&
              candidate.workDoneLast3Months
                .toLowerCase()
                .includes(lowerCaseSearchText)
            );
          }
        }
      );
    }
    // Log the filtered candidates for debugging
    console.log('Filtered Candidates:', this.searchservice.filteredCandidates);
  }
  // end of filter method
 
  saveEditedValue(candidate: any) {
    // Update the candidate's empId with the edited value
    candidate.empId = this.editedValue;
    candidate.isEditing = false;
 
    // Save the updated data to the database
    const apiUrl = url2 + `update`;
 
    this.http
      .put<Interview[]>(apiUrl, [candidate]) // Wrap the single candidate in an array
      .subscribe(
        (updatedList: Interview[]) => {
          console.log('Candidate updated successfully.');
          // Handle the updated list here, e.g., update your local list with the new data
          this.filteredCandidates = updatedList;
        },
        (error) => {
          console.error('Error updating candidate:', error);
        }
      );
  }
}