import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Interview } from '../Models/interview';
import { api } from 'src/assets/api/url';

const url2=`${api.URL_INTERVIEW}`;

@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.css']
})
export class SearchCandidatesComponent implements OnInit {
  // selectedSearchCriteria: string = 'empId';
  // searchValue: string = '';
  // searchResults: any[] = [];
  // apiUrls: { [key: string]: string } = {
  //   empId: 'http://localhost:8089/interviews/byEmpId',
  //   empName: 'http://localhost:8089/interviews/byEmployeeName',
  //   email: 'http://localhost:8089/interviews/byEmail',
  // };

  // constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.fetchCandidates();
  // }

  // onSearchCriteriaChange(): void {
  //   this.fetchCandidates();
  // }

  // onSearchValueChange(): void {
  //   this.fetchCandidates();
  // }

  // fetchCandidates(): void {
  //   const apiUrl = this.apiUrls[this.selectedSearchCriteria];
    
  //   const params = new HttpParams().set(this.selectedSearchCriteria, this.searchValue);

  //   this.http.post<any[]>(apiUrl, { params }).subscribe(data => {
  //     this.searchResults = data;
  //   });
  // }

  

ngOnInit(): void {}

  // Define the onSearchCriteriaChange method to handle the select change event
  onSearchCriteriaChange(): void {
    // Handle the change here
  }

  // Define the onSearchValueChange method to handle the input change event
  onSearchValueChange(): void {
    // Handle the change here
  }

  selectedSearchCriteria: string = 'empId'; // Default search criteria
  searchValue: string = '';
  searchResults: Interview[] = [];
  showAttachmentModal: boolean = false;
  selectedAttachment: SafeResourceUrl = '';
  // Define the API URLs
  private apiUrls: { [key: string]: string } = {
    empId: url2+'byEmpId',
    empName: url2+'byEmployeeName',
    email: url2+'byEmail',
    mentorName: url2+'byMentorName'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private router:Router) {}
  fetchCandidates() {
    const apiUrl = this.apiUrls[this.selectedSearchCriteria];
    let requestPayload: any = {};
    switch (this.selectedSearchCriteria) {
      case 'empId':
        requestPayload = { empId: parseInt(this.searchValue) };
        break;
      case 'empName':
        requestPayload = { employeeName: this.searchValue };
        break;
      case 'email':
        requestPayload = { email: this.searchValue };
        break;
      case 'mentorName':
        requestPayload = { mentorName: this.searchValue };
        break;
      default:
        // Handle the default case or show an error message
        break;
    }

    this.http.post<Interview[]>(apiUrl, requestPayload).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error('Error fetching candidates:', error);
        // Handle errors
      }
    );
  }

  
  openAttachment(attachmentUrl: string) {
    // Display the attachment in the modal
    this.selectedAttachment = this.sanitizer.bypassSecurityTrustResourceUrl(attachmentUrl);
    this.showAttachmentModal = true;
  }

  closeAttachment() {
    // Close the modal
    this.showAttachmentModal = false;
    this.selectedAttachment = '';
  }


  // deleteCandidate(candidate: Interview) {
  //   const empId = candidate.empId; // Get the empId of the candidate you want to delete
    
  //   console.log('EmpId:', empId);
    
  //   // Make an HTTP DELETE request with the correct URL
  //   this.http.delete(`http://localhost:8089/interviews/delete/${empId}/${projectCode}`, { responseType: 'text' })
  //     .subscribe(
  //       (response) => {
  //         console.log('Delete response:', response);

  //         if (response === 'Interview deleted successfully') {
  //           // Show an alert
  //           alert(`Candidate with empId ${empId} deleted successfully!`);
            
  //           // Reload the current route
  //           this.router.navigateByUrl('/view', { skipLocationChange: true }).then(() => {
  //             this.router.navigate(['/view']);
  //           });
  //         } else {
  //           console.error(`Error deleting candidate with empId ${empId} : Unexpected response`);
  //           // Handle unexpected responses here
  //         }
  //       },
  //       (error) => {
  //         console.error(`Error deleting candidate with empId ${empId}`, error);
  //         // Handle errors here
  //       }
  //     );
  // }


}
