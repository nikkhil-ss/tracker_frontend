import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { LiveClockComponent } from './live-clock/live-clock.component';
import { MentorviewComponent } from './mentorview/mentorview.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AdmincandidateComponent } from './admincandidate/admincandidate.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { AdminSearchresultComponent } from './admin-searchresult/admin-searchresult.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { ChangepasswordalertComponent } from './changepasswordalert/changepasswordalert.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeMentorComponent } from './home-mentor/home-mentor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SearchCandidatesComponent,
    AddCandidateComponent,
    ViewCandidateComponent,
    SignupComponent,
    WelcomePageComponent,
    EditPageComponent,
    ConfirmDialogComponent,
    EditModalComponent,
    LiveClockComponent,
    MentorviewComponent,
    AdmindashboardComponent,
    AdminviewComponent,
    AdmincandidateComponent,
    SearchresultComponent,
    AdminSearchresultComponent,
    ChangePasswordModalComponent,
    ChangepasswordalertComponent,
    HomeAdminComponent,
    HomeMentorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [DatePipe,AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
