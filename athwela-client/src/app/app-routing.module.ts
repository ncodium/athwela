import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/user/messages/messages.component';
import { CommunityComponent } from './components/user/community/community.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { NewCampaignComponent } from './components/campaigns-new/campaigns-new.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { CampaignPageComponent } from './components/shared/campaign-page/campaign-page.component';
import { AdminDashboardComponent } from './components/administrator/admin-dashboard/admin-dashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
import { AdminModeratorsComponent } from './components/administrator/admin-moderators/admin-moderators.component';
import { MychartComponent } from './components/shared/mychart/mychart.component';
import { ModDashboardComponent } from './components/moderator/mod-dashboard/mod-dashboard.component';
import { ModCampaignsComponent } from './components/moderator/mod-campaigns/mod-campaigns.component';
import { ModUsersComponent } from './components/moderator/mod-users/mod-users.component';

// route guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // general access
  { path: '', component: HomeComponent },
  { path: 'campaign/new', component: NewCampaignComponent, canActivate: [AuthGuard] },
  { path: 'campaign/:id', component: CampaignPageComponent },
  { path: 'campaign', redirectTo: '/campaigns', pathMatch: 'full' },
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },
  { path: 'how-it-works', component: HowItWorksComponent },
  
  // administrator
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/campaigns', component: AdminCampaignsComponent, canActivate: [AuthGuard] },
  { path: 'admin/donations', component: AdminDonationsComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuard] },
  { path: 'admin/moderators', component: AdminModeratorsComponent, canActivate: [AuthGuard] },

  // moderator
  { path: 'mod', component: ModDashboardComponent, canActivate: [AuthGuard] },
  { path: 'mod/campaigns', component: ModCampaignsComponent, canActivate: [AuthGuard] },
  { path: 'mod/users', component: ModUsersComponent, canActivate: [AuthGuard] },
  
  // other
  { path: 'chart', component: MychartComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }