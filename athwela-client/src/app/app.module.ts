import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// manual imports
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
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';

// custom services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// custom guards
import { AuthGuard } from './guards/auth.guard';

// ngx-bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// fa icons
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { CampaignComponent } from './components/campaign/campaign.component';

<<<<<<< HEAD

=======
import { AdmindashboardComponent } from './components/administrator/admindashboard/admindashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
 
 
>>>>>>> e327d668643d48fb8a4a31151e3bd998add43e70
// user components


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
<<<<<<< HEAD
    MessagesComponent,
    CommunityComponent,
    CampaignsComponent,
    NewCampaignComponent,
=======
    CampaignComponent,
    AdmindashboardComponent,
    AdminCampaignsComponent,
    AdminDonationsComponent,
    AdminUsersComponent,
     
 
>>>>>>> e327d668643d48fb8a4a31151e3bd998add43e70
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
    BsDropdownModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    HttpClientModule,
    AuthGuard,
  ],
  bootstrap: [
    AppComponent, NavigationComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faInbox);    
  }
 }