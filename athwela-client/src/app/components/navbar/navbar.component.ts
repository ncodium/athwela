import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  isCollapsed = true;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
    ) {}

  ngOnInit() {
  }

  toggleColapse() {this.isCollapsed = !this.isCollapsed;}

  openLoginModal() {
    const initialState = {
      title: 'Log In'
    };

    this.modalRef = this.modalService.show(LoginComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  openRegisterModal() {
    const initialState = {
      title: 'Register'
    };
    
    this.modalRef = this.modalService.show(RegisterComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.showFlashMessage({
      messages: ["You are logged out"],
      dismissible: false,
      timeout: 3000,
      type: 'success'
    });
    this.router.navigate(['/']);
    console.log('asdf');
    return false;
  }

}
