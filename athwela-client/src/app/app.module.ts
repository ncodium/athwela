import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

// general
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CommunityComponent } from './pages/community/community.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { NewCampaignComponent } from './pages/campaigns-new/campaigns-new.component';
import { CampaignPageComponent } from './pages/campaign-page/campaign-page.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { CampaignCommentsComponent } from './components/campaign-comments/campaign-comments.component';
import { CampaignDonateComponent } from './components/campaign-donate/campaign-donate.component';
import { CampaignDonationConfirmComponent } from './components/campaign-donation-confirm/campaign-donation-confirm.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCampaignsComponent } from './pages/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './pages/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminModeratorsComponent } from './pages/admin-moderators/admin-moderators.component';
import { ModDashboardComponent } from './pages/mod-dashboard/mod-dashboard.component';
import { ModCampaignsComponent } from './pages/mod-campaigns/mod-campaigns.component';
import { ModUsersComponent } from './pages/mod-users/mod-users.component';

// services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// guards
import { AuthGuard } from './guards/auth.guard';

// ngx-bootstrap
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';

// icons
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

// additional
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ChartsModule } from 'ng2-charts';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { MychartComponent } from './components/mychart/mychart.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from "ngx-spinner";

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
    CampaignCommentsComponent,
    AdminDashboardComponent,
    AdminCampaignsComponent,
    AdminDonationsComponent,
    AdminUsersComponent,
    AdminModeratorsComponent,
    HomeFooterComponent,
    MychartComponent,
    ModDashboardComponent,
    CampaignPageComponent,
    PageNotFoundComponent,
    HowItWorksComponent,
    ModCampaignsComponent,
    ModUsersComponent,
    TruncateTextPipe,
    FooterComponent,
    CampaignDonateComponent,
    CampaignDonationConfirmComponent,
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
    ChartsModule,
    PasswordStrengthMeterModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    FileUploadModule,
    NgxSpinnerModule,
  ],
  providers: [
    Title,
    ValidateService,
    AuthService,
    HttpClientModule,
    AuthGuard
  ],
  bootstrap: [
    AppComponent, NavigationComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    CampaignDonateComponent,
    CampaignDonationConfirmComponent
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
    library.addIcons(faInbox);
    library.addIcons(faUser);
  }
}