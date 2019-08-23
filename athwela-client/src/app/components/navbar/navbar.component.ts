import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openLoginModal() {
    const initialState = {
      title: 'Login'
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

}
