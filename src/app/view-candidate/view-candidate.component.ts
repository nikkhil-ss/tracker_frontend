import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interview } from '../Models/interview';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchServiceService } from '../search-service.service';

//viewing all candidates
import { api } from 'src/assets/api/url';

const url2 = `${api.URL_INTERVIEW}`;
@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css'],
})
export class ViewCandidateComponent implements OnInit {
  candidates: Interview[] = [];
  showAttachmentModal: boolean = false;
  selectedAttachment: string | SafeResourceUrl = '';
  searchText: string = '';
  //filteredCandidates: any[] = [];
  editedValue: any;
  mentorName: any;
  editedCandidates: Interview[] = [];
  bulkEditingMode: boolean = false;

  url = url2 + `byMentorName/`;

  selectedValue: string = '';
  selectedCandidates: Interview[] = [];

  searchFieldText: string = '';
  checkedOptions: string[] = [];

  checkboxInputText: { [key: string]: string } = {};

  filterOptions: any = {
    baselineDate: false,
    empId: false,
    employeeName: false,
    email: false,
    localGrade: false,
    currentDayStatus: false,
    mainProject: false,
    accountName: false,
    trainingBatchId: false,
    mentorName: false,
    trainingScoreFeedback: false,
    bucket: false,
    qualitativeFeedback: false,
    oceanAttemptedTillDate: false,
    oceanScoreIfAttempted: false,
    hsCertificationDone: false,
    digiDashboardUpdatedRegularly: false,
    accountShadowsDone: false,
    currentStatus: false,
    upskillingWhileOnBench: false,
    currentInitiativeInvolvedIn: false,
    workDoneLast3Months: false,
    personReachable: false,
    pscRemarks: false,
    btoAverageQ3Attendance: false,
    sapienceAvgLast3Months: false,
    leaveBalance: false,
    leaveAppliedLast3Months: false,
    botpStatus: false,
    subStatus: false,
    college: false,
    collegeType: false,
    education: false,
    recruitmentSwarScore: false,
    recruitmentAptitudeScore: false,
    recruitmentCodingScore: false,
    mobilePhoneNumber: '',
    office: false,
    joiningDate: false,
    globalPractice: false,
    keySkillsSummary: false,
    currentAvailability: false,
    type: false,
    startDate: false,
    endDate: false,
    shadowAgeing: false,
    shadowAgeingBucket: false,
    benchAgingInDays: false,
    benchAgingRange: false,
    trainingModel: false,
    initialTrainingEndDate: false,
    botpClosureStatus: false
  };

  filteredCheckboxes: string[] = Object.keys(this.filterOptions); // Array to store filtered checkboxes

  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog, // Inject MatDialog
    public searchservice: SearchServiceService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  toggleBulkEditingMode() {
    this.bulkEditingMode = !this.bulkEditingMode;
  }

  editMultipleCandidates() {
    // Toggle the editing mode for selected candidates
    this.searchservice.filteredCandidates.forEach((candidate: Interview) => {
      if (candidate.isSelected) {
        candidate.isEdit = !candidate.isEdit;

        // Add the candidate to the editedCandidates list if in edit mode
        if (candidate.isEdit) {
          this.editedCandidates.push(candidate);
        } else {
          // Remove the candidate from the editedCandidates list if not in edit mode
          const index = this.editedCandidates.indexOf(candidate);
          if (index !== -1) {
            this.editedCandidates.splice(index, 1);
          }
        }
      }
    });
  }

  saveMultipleCandidates() {
    // Extract only edited candidates for bulk update
    const candidatesToUpdate = this.editedCandidates;

    if (candidatesToUpdate.length === 0) {
      // Handle case where no candidates are in edit mode
      console.log('No candidates in edit mode for bulk update.');
      return;
    }

    // Make an HTTP PUT request to update multiple candidates
    this.http.put(url2 + 'update-Multiple', candidatesToUpdate).subscribe(
      (response: Object) => {
        console.log('Bulk update successful.', response);

        // Reset editing mode for all candidates
        this.searchservice.filteredCandidates.forEach(
          (candidate: { isEdit: boolean; isSelected: boolean }) => {
            candidate.isEdit = false;
            candidate.isSelected = false;
          }
        );

        // Clear the editedCandidates list
        this.editedCandidates = [];

        // Show a snackbar notification
        this.snackBar.open('Edited candidates updated successfully!', 'Close', {
          duration: 3000,
        });
        window.location.reload();
        // Reload the current route or fetch interviews again
        this.router
          .navigateByUrl('/adminDashboard/adminView', {
            skipLocationChange: true,
          })
          .then(() => {
            this.router.navigate(['/adminDashboard/adminView']);
          });
      },
      (error) => {
        console.error('Error updating candidates:', error);
        // Handle errors here
      }
    );
  }

  cancelEdit(candidate: Interview) {
    candidate.isEdit = false;
    const index = this.editedCandidates.indexOf(candidate);
    if (index !== -1) {
      this.editedCandidates.splice(index, 1);
    }
  }
  filterCandidates() {
    console.log('Filtering candidates. Search Text:', this.searchText);

    if (!this.searchText || this.searchText.trim() === '') {
      // If search text is empty, show all candidates
      this.searchservice.filteredCandidates = this.candidates;
    } else {
      // Filter candidates based on search text
      this.searchservice.filteredCandidates = this.candidates.filter(
        (candidate) => {
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
        }
      );
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
    console.log('Hello Mentor view');
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
    console.log('from frontend', candidate);
    this.http.post(url2 + 'create', candidate).subscribe(
      (data) => {
        alert('data updated Successfully');
      },
      (error) => console.log(error)
    );
  }

  checkData() {
    console.log('datadfsfh', this.searchservice.filteredCandidates);
  }

  fetchInterviews() {
    // Make an HTTP GET request to your Spring Boot backend API
    this.http.get<Interview[]>(this.url).subscribe(
      (response) => {
        console.log('response', response);
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

  deleteCandidate(candidate: Interview) {
    const index = this.selectedCandidates.indexOf(candidate);
    if (index === -1) {
      this.selectedCandidates.push(candidate);
    } else {
      this.selectedCandidates.splice(index, 1);
    }
  }

  deleteSelectedCandidates() {
    const empIds = this.selectedCandidates.map((candidate) => candidate.empId);
    if (empIds.length === 0) {
      // Handle case where no candidates are selected
      console.log('No candidates selected for deletion.');
      return;
    }

    // Perform the delete operation for multiple candidates
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete the selected candidates?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked 'Yes', perform deletion logic here
        this.performDeleteMultipleCandidates(empIds);
      } else {
        // User clicked 'No' or closed the dialog, handle accordingly
        console.log('User clicked No or closed the dialog');
      }
    });
  }

  private performDeleteMultipleCandidates(empIds: number[]) {
    // Make an HTTP DELETE request with the correct URL
    this.http
      .request('delete', url2 + 'delete-multiple', {
        body: empIds,
        responseType: 'text' as 'text',
      })
      .subscribe(
        (response: string) => {
          if (response === 'Candidates deleted successfully') {
            this.snackBar.open(
              'Selected candidates deleted successfully!',
              'Close',
              { duration: 3000 }
            );
            window.location.reload();
          } else {
            console.error('Error deleting candidates: Unexpected response');
          }
        },
        (error) => {
          console.error('Error deleting candidates:', error);
          // Handle errors here
        }
      );
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

  editCell(candidate: any) {
    // Set the edited value to the item's value
    this.editedValue = candidate.empId;
    candidate.isEditing = true;
  }

   // Function to reset search text and filterOptions
   resetFilters() {
    this.searchFieldText = ''; // Reset search text
    Object.keys(this.filterOptions).forEach(key => this.filterOptions[key] = false);
    this.checkboxInputText = {};

    this.closeModel();
    this.openModel();
  }

  //saving checked options
  updateCheckedCheckboxes(option: string): void {
    if (this.checkedOptions.includes(option)) {
      // Remove the option if it's already in the array
      this.checkedOptions = this.checkedOptions.filter(item => item !== option);
    } else {
      // Add the option if it's not in the array
      this.checkedOptions.push(option);
    }
    if (!this.filterOptions[option]) {
      // Uncheck the checkbox
      this.checkboxInputText[option] = '';
    }
  }
 
  //search filter method
 
  applyFilter() {
    console.log('Filtering candidates - Search Field Text:', this.searchFieldText);
    console.log('Filtering candidates - Selected options: ', this.checkedOptions);
    console.log('Filtering candidates - Selected Checkbox input: ', this.checkboxInputText);
  
    if (this.checkedOptions.length===0) {
      // If search text is empty, show all candidates
      this.searchservice.filteredCandidates = this.candidates;
    } else {
      
      this.searchservice.filteredCandidates = this.candidates.filter(candidate => {
        return this.checkedOptions.every(checkedOption => {
          const lowerCaseSearchText = this.checkboxInputText[checkedOption]?.toString().toLowerCase() || '';
          const candidateValue = (candidate as any)[checkedOption]?.toString().toLowerCase() || '';
          return candidateValue.includes(lowerCaseSearchText);
        });
      });
    }
    // Log the filtered candidates for debugging
    console.log('Filtered Candidates:', this.searchservice.filteredCandidates);
  }
// end of filter method

// Add the getFilteredOptions() function
getFilteredOptions(): string[] {
  const searchText = this.searchFieldText.toLowerCase();

  // Return the filteredOptions array based on the search text
  return this.filteredCheckboxes
    .filter(option => option.toLowerCase().includes(searchText));
}

getFilterOptionsKeys(): string[] {
  if (this.searchFieldText.trim() === '') {
    return Object.keys(this.filterOptions);
  } else {
    return [];
  }
}

openModel() {
  // Get the modal element using Angular ElementRef
  const modal = this.el.nativeElement.querySelector('#exampleModal');
 
  // Add the 'show' class to display the modal
  this.renderer.addClass(modal, 'show');
 
  // Add the 'modal-open' class to the body to allow for scrolling
  this.renderer.addClass(document.body, 'modal-open');
}
 
closeModel() {
  // Get the modal element using Angular ElementRef
  const modal = this.el.nativeElement.querySelector('#exampleModal');
 
  // Remove the 'show' class to hide the modal
  this.renderer.removeClass(modal, 'show');
 
  // Remove the 'modal-open' class from the body
  this.renderer.removeClass(document.body, 'modal-open');
}

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
          this.searchservice.filteredCandidates = updatedList;
        },
        (error) => {
          console.error('Error updating candidate:', error);
        }
      );
  }
}
