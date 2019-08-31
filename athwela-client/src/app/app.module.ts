import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// manual imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// custom components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';



// custom services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// ngx-bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminComponent } from './components/admin/admin.component';

// flash messages module
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgFlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ValidateService,
    AuthService,
    HttpClientModule,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule { }
