import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss'],
  providers: [UserService]
})
export class AdminModeratorsComponent implements OnInit {
  modalRef: BsModalRef;
  Users: User[];

  getModerators() {
    this.userService.getModerators().subscribe((res) => {
      this.Users = res['users'] as User[];

    });
  }

  alerts: any = [];

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getModerators();
  }

  onRegisterSubmit() {

  }

  openRegister(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}


