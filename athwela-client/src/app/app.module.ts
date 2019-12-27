import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

// general custom components
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/user/messages/messages.component';
import { CommunityComponent } from './components/user/community/community.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { NewCampaignComponent } from './components/campaigns-new/campaigns-new.component';
import { CampaignPageComponent } from './components/shared/campaign-page/campaign-page.component';
import { CampaignCardComponent } from './components/shared/campaign-card/campaign-card.component';
import { CampaignCommentComponent } from './components/shared/campaign-comment/campaign-comment.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

// admininstrator components
import { AdminDashboardComponent } from './components/administrator/admin-dashboard/admin-dashboard.component';
import { AdminCampaignsComponent } from './components/administrator/admin-campaigns/admin-campaigns.component';
import { AdminDonationsComponent } from './components/administrator/admin-donations/admin-donations.component';
import { AdminUsersComponent } from './components/administrator/admin-users/admin-users.component';
import { AdminModeratorsComponent } from './components/administrator/admin-moderators/admin-moderators.component';

// moderator components
import { ModDashboardComponent } from './components/moderator/mod-dashboard/mod-dashboard.component';
import { ModCampaignsComponent } from './components/moderator/mod-campaigns/mod-campaigns.component';
import { ModUsersComponent } from './components/moderator/mod-users/mod-users.component';

// custom services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// route guards
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

// additional modules
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ChartsModule } from 'ng2-charts';
import { MychartComponent } from './components/shared/mychart/mychart.component';

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
    CampaignCommentComponent,
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
    TabsModule.forRoot()
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
    RegisterComponent
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
    library.addIcons(faInbox);
    library.addIcons(faUser);
  }
}