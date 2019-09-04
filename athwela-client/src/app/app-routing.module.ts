import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdmindashboardComponent } from './components/administrator/admindashboard/admindashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
import {  MychartComponent} from './components/shared/mychart/mychart.component';
 


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: MychartComponent, canActivate: [AuthGuard] },

{path: 'admin/campaigns', component: AdminCampaignsComponent, canActivate: [AuthGuard]},
{path: 'admin/donations', component: AdminDonationsComponent, canActivate: [AuthGuard]},
{path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuard]},

{ path: 'admin', component: AdmindashboardComponent, canActivate: [AuthGuard],
children: [
   

  
] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
