import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export class Interview {
  empId!: number;
  employeeName!: string;
  email!: string;
  projectName!: string;
  projectCode!: string;
  projectManager!: string;
  projectLocation!: string;
  proposedDate!: Date;
  mentorName!: string;
  interviewed!: boolean;
  interviewDate!: Date
  feedback!: string;
  feedbackDescription!: string;
  comment!: string;
  feedbackAttachment!: string;
}
import { api } from 'src/assets/api/url';

const url2=`${api.URL_INTERVIEW}`;

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {
  newCandidate: any = {
    proposedDate: '',
    mentorName: '',
    empId: null,
    employeeName: '',
    email: '',
    projectCode: '',
    projectName: '',
    projectManager: '',
    projectLocation: '',
    interviewed: false,
    interviewDate: '',
    feedback: '',
    feedbackDescription: '',
    comment: '',
    feedbackAttachment: '',
    image: ''
  };
  candidates: Interview[] = [];
  showAlertForPastDate: boolean = false;
  constructor(private http: HttpClient) {}

  checkForPastDate() {
    const selectedDate = new Date(this.newCandidate.proposedDate);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      this.showAlertForPastDate = true;
    } else {
      this.showAlertForPastDate = false;
    }
  }

  editCandidate(candidate: any) {
    //fetch candidate from db

  }

  fetchInterviews() {
    // Make an HTTP GET request to your Spring Boot backend API
    this.http.put<Interview[]>(url2+'all', this.newCandidate).subscribe(
      (response) => {
        this.candidates = response;
        console.log('Interviews:', this.candidates);
      },
      (error) => {
        console.error('Error fetching interviews:', error);
      }
    );
  }
}
