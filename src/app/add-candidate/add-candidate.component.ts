import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { api } from 'src/assets/api/url';

export class Interview {
  empId!: number;
  employeeName!: string;
  email!: string;
  initialBu!: string;
  baselineDate!: Date;
  localGrade!: string;
  currentDayStatus!: string;

  mobilePhoneNumber!: string;
  office!: string;
  joiningDate!: Date;
  globalPractice!: string;
  keySkillsSummary!: string;
  currentAvailability!: string;
  type!: string;
  startDate!: Date;
  endDate!: Date;
  shadowAgeing!: string;
  shadowAgeingBucket!: string;
  benchAgingInDays!: string;
  benchAgingRange!: string;
  trainingModel!: string;
  initialTrainingEndDate!: Date;
  botpClosureStatus!: string;

  mainProject!: string;
  accountName!: string;
  trainingBatchId!: string;
  mentorName!: string;
  trainingScoreFeedback!: string;
  bucket!: string;
  qualitativeFeedback!: string;
  oceanAttemptedTillDate!: string;
  oceanScoreIfAttempted!: string;
  hsCertificationDone!: string;
  digiDashboardUpdatedRegularly!: Date;
  accountShadowsDone!: string;
  currentStatus!: string;
  upskillingWhileOnBench!: string;
  currentInitiativeInvolvedIn!: string;
  workDoneLast3Months!: string;
  personReachable!: string;
  pscRemarks!: string;
  btoAverageQ3Attendance: any; // Replace with appropriate type
  sapienceAvgLast3Months!: string;
  leaveBalance!: string;
  leaveAppliedLast3Months!: string;
  botpStatus!: string;
  subStatus!: string;
  college!: string;
  collegeType!: string;
  education!: string;
  recruitmentSwarScore!: string;
  recruitmentAptitudeScore!: string;
  recruitmentCodingScore!: string;
}

const url = `${api.URL_ADMIN}`;
const url2 = `${api.URL_INTERVIEW}`;
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent {
  newCandidate: any = {
    baselineDate: '',
    mentorName: '',
    empId: '',
    employeeName: '',
    email: '',
    initialBu: '',

    mobilePhoneNumber: '',
    office: '',
    joiningDate: '',
    globalPractice: '',
    keySkillsSummary: '',
    currentAvailability: '',
    type: '',
    startDate: '',
    endDate: '',
    shadowAgeing: '',
    shadowAgeingBucket: '',
    benchAgeingInDays: '',
    benchAgeingRange: '',
    trainingModel: '',
    initialTrainingEndDate: '',
    botpClosureStatus: '',

    qualitativeFeedback: '',
    oceanAttemptedTillDate: '',
    oceanScoreIfAttempted: '',
    hsCertificationDone: '',
    digiDashboardUpdatedRegularly: '',
    accountShadowsDone: '',
    currentStatus: '',
    upskillingWhileOnBench: '',
    currentInitiativeInvolvedIn: '',
    workDoneLast3Months: '',
    personReachable: '',
    pscRemarks: '',
    btoAverageQ3Attendance: '',
    sapienceAvgLast3Months: '',
    leaveBalance: '',
    leaveAppliedLast3Months: '',
    botpStatus: '',
    subStatus: '',
  };

  decodedDate: any;
  decodedDateDigi: any;
  decodedJoiningDate: any;
  decodedStartDate: any;
  decodedEndDate: any;
  decodedInitialTrainingEndDate: any;
  localGradeOptions = [
    'A3 - Associate',
    'A4 - Analyst',
    'A5 - Senior Analyst',
    'B1 - Associate Consultant',
    'B2 - Consultant',
    'C1 - Senior Consultant',
  ];
  file: { progress: number }[] = [];

  constructor(
    private datePipe: DatePipe,
    private httpClient: HttpClient,
    private router: Router
  ) {}
  addCandidate() {
    this.httpClient.post(url2 + 'create', this.newCandidate).subscribe(
      (response) => {
        alert('Candidate added successfully!');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/add']);
          });
        // Optionally, handle success response here
      },
      (error) => {
        console.error('Error adding candidate:', error);

        // Handle errors here
      }
    );
  }

  private formatDate(date: string): string {
    // return date ? this.datePipe.transform(new Date(date), 'yyyy-MM-dd') || '' : '';

    console.log('date: ', date);
    if (date) {
      const excelTimestamp: any = date; // Example with both date and time

      // Adjust for the Windows Excel epoch
      const epochAdjustment = 25569; // Number of days between Excel epoch (1900-01-01) and JavaScript epoch (1970-01-01)
      const javascriptTimestamp =
        (excelTimestamp - epochAdjustment) * 24 * 60 * 60 * 1000;

      // Create a new Date object using the JavaScript timestamp
      const date1 = new Date(javascriptTimestamp);

      console.log('date decoded: ', date1.toISOString().split('T')[0]);

      return date1.toISOString().split('T')[0];
    }
    return '';
  }

  handleFileInput(files: any[]) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.file.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.file.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.file[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.file[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  // myImage!: Observable<any>;
  base64code!: any;

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      //this.myImage = d;
      this.base64code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  uploadedData: Interview[] = [];
  showFileInput: boolean = false;

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Assuming the Excel sheet has a specific structure
      const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      // console.log("excelData: ", excelData[1])

      // Map the extracted data to the Interview class structure
      this.uploadedData = excelData.slice(1).map(
        (row) => (
          console.log(this.uploadedData),
          (this.decodedDate = this.formatDate(row[0])),
          (this.decodedDateDigi = this.formatDate(row[32])),
          (this.decodedJoiningDate = this.formatDate(row[8])),
          (this.decodedInitialTrainingEndDate = this.formatDate(row[25])),
          (this.decodedStartDate = this.formatDate(row[14])),
          (this.decodedEndDate = this.formatDate(row[15])),
          {
            initialBu: row[1],
            empId: row[2],
            employeeName: row[3],
            localGrade: row[4],
            email: row[5],
            baselineDate: this.decodedDate,
            mobilePhoneNumber: row[6],
            office: row[7],
            joiningDate: this.decodedJoiningDate,
            globalPractice: row[9],
            keySkillsSummary: row[10],
            currentDayStatus: row[11],
            currentAvailability: row[12],
            type: row[13],
            startDate: this.decodedStartDate,
            endDate: this.decodedEndDate,
            mainProject: row[16],
            accountName: row[17],
            shadowAgeing: row[18],
            shadowAgeingBucket: row[19],
            benchAgingInDays: row[20],
            benchAgingRange: row[21],
            trainingModel: row[22],
            trainingBatchId: row[23],
            mentorName: row[24],
            initialTrainingEndDate: this.decodedInitialTrainingEndDate,
            trainingScoreFeedback: row[26],
            bucket: row[27],
            qualitativeFeedback: row[28],
            oceanAttemptedTillDate: row[29],
            oceanScoreIfAttempted: row[30],
            hsCertificationDone: row[31],
            digiDashboardUpdatedRegularly: this.decodedDateDigi,
            accountShadowsDone: row[33],
            currentStatus: row[34],
            upskillingWhileOnBench: row[35],
            currentInitiativeInvolvedIn: row[36],
            workDoneLast3Months: row[37],
            personReachable: row[38],
            pscRemarks: row[39],
            btoAverageQ3Attendance: row[40],
            sapienceAvgLast3Months: row[41],
            leaveBalance: row[42],
            leaveAppliedLast3Months: row[43],
            botpStatus: row[44],
            subStatus: row[45],
            botpClosureStatus: row[46],
            college: row[47],
            collegeType: row[48],
            education: row[49],
            recruitmentSwarScore: row[50],
            recruitmentAptitudeScore: row[51],
            recruitmentCodingScore: row[52],
          }
        )
      );
    };

    reader.readAsBinaryString(file);
  }

  saveInterviewData() {
    const apiUrl = url2 + 'createall';
    console.log('Data sent to the backend:', this.uploadedData);

    this.httpClient.post(apiUrl, this.uploadedData).subscribe(
      (response) => {
        // Handle the response from the backend if needed.
        console.log('Data sent to the backend:', response);
      },
      (error) => {
        // Handle errors here.
        console.error('Error sending data to the backend:', error);
      }
    );
  }
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }
  uploadFile() {
    this.showFileInput = true;
    this.saveInterviewData();
    alert('Candidates added successfully');
  }

  downloading = false;
  downloadExcelSample() {
    const filePath = 'assets/Bench File Sample.xlsx';
    this.downloading = true;
    setTimeout(() => {
      this.downloading = false;
    }, 3000);
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Bench File Sample.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
