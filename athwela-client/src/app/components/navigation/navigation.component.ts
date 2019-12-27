import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  modalRef: BsModalRef;
  isCollapsed = true;
  alerts: any = [];

  user: User;
  loggedIn: Boolean;
  isAdmin: Boolean;
  isMod: Boolean;
  isUser: Boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  authReset() {
    this.loggedIn = this.authService.loggedIn();
    if (this.loggedIn) {
      this.user = this.authService.getUser();
      this.isAdmin = this.user.role == 'admin';
      this.isMod = this.user.role == 'mod';
      this.isUser = this.user.role == 'user';
    }
    else {
      this.user = null;
      this.isAdmin = this.isMod = this.isUser = false;
    }
  }

  ngOnInit() {
    this.authReset();
  }

  toggleColapse() { this.isCollapsed = !this.isCollapsed; }

  openLoginModal() {
    const initialState = {
      title: 'Sign in to Athwela'
    };

    this.modalRef = this.modalService.show(LoginComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';

    this.modalRef.content.onClose.subscribe(result => {
      this.authReset();
    })
  }

  openRegisterModal() {
    const initialState = {
      title: 'New User Registration'
    };

    this.modalRef = this.modalService.show(RegisterComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';

    this.modalRef.content.onClose.subscribe(result => {
      this.authReset();
    })
  }

  onLogoutClick() {
    this.authService.logout();
    this.authReset();
  }
}