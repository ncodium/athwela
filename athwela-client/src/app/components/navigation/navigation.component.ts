import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// TODO
// Recognize user roles and generate dashboard links 

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  modalRef: BsModalRef;
  isCollapsed = true;
  alerts: any = [];
  role: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

  }

  toggleColapse() { this.isCollapsed = !this.isCollapsed; }

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

  onLogoutClick() {
    this.authService.logout();
    this.alerts = [
      {
        type: 'success',
        msg: `You are logged out!`
      }
    ];
    this.router.navigate(['/']);
    this.role = '';
    return false;
  }

  isAdmin() {
    if (this.authService.loggedIn()) {
      console.log("not logged in so not showing");
      return false;
    }
    else {
      console.log("checking role");
      this.role = JSON.parse(localStorage.getItem('user')).role;
      console.log(this.role);
      if (this.role === 'admin') {
        return true;
      }
    }

    return false;
  }
}
