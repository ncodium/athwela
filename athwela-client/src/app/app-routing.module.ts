import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component'
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
import { ModDashboardComponent } from './components/moderator/mod-dashboard/mod-dashboard.component';

// route guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ModGuard } from './guards/mod.guard';
import { CampaignPageComponent } from './components/shared/campaign-page/campaign-page.component';

const routes: Routes = [
  // general access
  { path: '', component: HomeComponent },
  { path: 'campaign/new', component: NewCampaignComponent, canActivate: [AuthGuard] },
  { path: 'campaign/:id', component: CampaignPageComponent },
  { path: 'campaign', redirectTo: '/campaigns', pathMatch: 'full' },
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },

  // administrator only
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/campaigns', component: AdminCampaignsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/donations', component: AdminDonationsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/moderators', component: AdminModeratorsComponent, canActivate: [AuthGuard, AdminGuard] },

  // moderator only
  { path: 'mod', component: ModDashboardComponent, canActivate: [AuthGuard, ModGuard] },

  // other
  { path: 'chart', component: MychartComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
