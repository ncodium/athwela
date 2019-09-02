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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

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

// fa icons
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
<<<<<<< HEAD
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
=======
import { faSearch } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 85677a4f4df6f82dc11fcaa382808c137e969aa6

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
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
<<<<<<< HEAD
    ProgressbarModule.forRoot()
=======
    BsDropdownModule.forRoot()
>>>>>>> 85677a4f4df6f82dc11fcaa382808c137e969aa6
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
    library.addIcons(faSearch);    
  }
 }