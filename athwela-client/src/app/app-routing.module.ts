import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CommunityComponent } from './pages/community/community.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { NewCampaignComponent } from './pages/campaigns-new/campaigns-new.component';
import { CampaignPageComponent } from './pages/campaign-page/campaign-page.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCampaignsComponent } from './pages/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './pages/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminModeratorsComponent } from './pages/admin-moderators/admin-moderators.component';
import { ModDashboardComponent } from './pages/mod-dashboard/mod-dashboard.component';
import { ModCampaignsComponent } from './pages/mod-campaigns/mod-campaigns.component';
import { ModUsersComponent } from './pages/mod-users/mod-users.component';
import { MychartComponent } from './components/mychart/mychart.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

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
  { path: 'search-page', component: SearchPageComponent },

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
