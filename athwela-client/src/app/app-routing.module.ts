import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdmindashboardComponent } from './components/administrator/admindashboard/admindashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
 
 


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdmindashboardComponent, canActivate: [AuthGuard],
children: [
   
    {path: 'campaigns', component: AdminCampaignsComponent, canActivate: [AuthGuard]},
    {path: 'donations', component: AdminDonationsComponent, canActivate: [AuthGuard]},
    {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]}
  
] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
