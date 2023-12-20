import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component'; // Import your LoginComponent
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';
import { SignupComponent } from './signup/signup.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { hasroleGuard } from './hasrole.guard';
import { AdminviewComponent } from './adminview/adminview.component';
import { AdmincandidateComponent } from './admincandidate/admincandidate.component';
import { MentorviewComponent } from './mentorview/mentorview.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { AdminSearchresultComponent } from './admin-searchresult/admin-searchresult.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeMentorComponent } from './home-mentor/home-mentor.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path:'adminDashboard',component:HomeAdminComponent,canActivate:[AuthGuard],
  children:[
    {path:'adminView',component:AdminviewComponent},
    {path:'add',component:AdmincandidateComponent},
    {path:'adminSearchresult',component:AdminSearchresultComponent}
  ]

  
},
{path:'viewOtherMentor',component:MentorviewComponent},
  {path: 'dashboard', component:HomeMentorComponent,canActivate:[AuthGuard]},
  {path: 'search',component: SearchCandidatesComponent,canActivate:[AuthGuard]},
  {path: 'add',component: AddCandidateComponent,canActivate:[AuthGuard]},
  {path: 'view',component: ViewCandidateComponent,canActivate:[AuthGuard]},
  {path: 'searchresult',component: SearchresultComponent,canActivate:[AuthGuard]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
