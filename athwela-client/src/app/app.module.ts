import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// custom components
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
import { CampaignCardComponent } from './components/shared/campaign-card/campaign-card.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { AdminModeratorsComponent } from './components/administrator/admin-moderators/admin-moderators.component';
import { ModDashboardComponent } from './components/moderator/mod-dashboard/mod-dashboard.component';

// custom services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// custom guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ModGuard } from './guards/mod.guard';

// ngx-bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// charts
import { ChartsModule } from 'ng2-charts';
import { MychartComponent } from './components/shared/mychart/mychart.component';

// fa icons
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { CampaignPageComponent } from './components/shared/campaign-page/campaign-page.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    MessagesComponent,
    CommunityComponent,
    CampaignsComponent,
    NewCampaignComponent,
    CampaignCardComponent,
    AdminDashboardComponent,
    AdminCampaignsComponent,
    AdminDonationsComponent,
    AdminUsersComponent,
    HomeFooterComponent,
    MychartComponent,
    AdminModeratorsComponent,
    ModDashboardComponent,
    CampaignPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    ChartsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    HttpClientModule,
    AuthGuard,
    AdminGuard,
    ModGuard
  ],
  bootstrap: [
    AppComponent, NavigationComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    CampaignCardComponent
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faInbox, faUser);
  }
}
