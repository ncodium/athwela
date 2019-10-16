import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
      title: 'Sign in to Athwela'
    };

    this.modalRef = this.modalService.show(LoginComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  openRegisterModal() {
    const initialState = {
      title: 'Register on Athwela'
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
}
