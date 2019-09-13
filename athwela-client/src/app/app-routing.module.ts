import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/user/messages/messages.component';
import { CommunityComponent } from './components/user/community/community.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { NewCampaignComponent } from './components/campaigns-new/campaigns-new.component';
import { AdminDashboardComponent } from './components/administrator/admin-dashboard/admin-dashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
import { MychartComponent } from './components/shared/mychart/mychart.component';
import { AdminModeratorsComponent } from './components/administrator/admin-moderators/admin-moderators.component';
 

// guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },
  { path: 'campaigns/new', component: NewCampaignComponent, canActivate: [AuthGuard] },
  {
    path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard]
  },
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'chart', component: MychartComponent, canActivate: [AuthGuard] },

{path: 'admin/campaigns', component: AdminCampaignsComponent, canActivate: [AuthGuard]},
{path: 'admin/donations', component: AdminDonationsComponent, canActivate: [AuthGuard]},
{path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuard]},
{path: 'admin/moderators', component: AdminModeratorsComponent, canActivate: [AuthGuard]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
