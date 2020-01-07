import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
 

import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss'],
  providers: [UserService]
})
export class AdminModeratorsComponent implements OnInit {
  modalRef: BsModalRef;
  Users: User[];

   
  
  getmods() {
    this.userService.getmoderators().subscribe((res) => {
      this.Users = res['users'] as User[];
      
    });
  }
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;

  nameInvalid: boolean;
  emailInvalid: boolean;
  usernameInvalid: boolean;
  passwordInvalid: boolean;
  passwordMismatch: boolean;

  alerts: any = [];

   

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3, r: 20 },
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];

  constructor(private modalService: BsModalService,
    private validateService: ValidateService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  highlightInvalidInputFields() {
    // reset
    this.nameInvalid = this.usernameInvalid = this.emailInvalid = this.passwordInvalid = this.passwordMismatch = false;
    // and validate
    if (!this.username) this.usernameInvalid = true;
    if (!this.password) this.passwordInvalid = true;
    if (this.password != this.passwordConfirm) this.passwordMismatch = true;
    if (!this.passwordConfirm) this.passwordMismatch = true;
    if (!this.name) this.nameInvalid = true;
    if (!this.email) this.emailInvalid = true;
  }


  ngOnInit() {
    // initiation state
    this.nameInvalid = this.usernameInvalid = this.emailInvalid = this.passwordInvalid = this.passwordMismatch = false;
    this.alerts = [
      {
        type: 'info',
        msg: 'Please enter your details in their respective fields and click on <strong>Register</strong> to continue.'
      }
    ]
    this.getmods();
  }
  onRegisterSubmit() {
    // generate an object from the data provided in fields
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role: 'mod'

    }

    this.highlightInvalidInputFields();

    // required fields
    if (!this.username && !this.email && !this.password && !this.name) {
      this.alerts = [
        {
          type: 'warning',
          msg: `all fields required`
        }
      ];
    }
    else if (!this.username) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide your username to continue.`
        }
      ];
    }
    else if (!this.password) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide a password for your account to continue.`
        }
      ];
    }
    else if (!this.passwordConfirm) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Your passwords don't match. Please enter your password again.`
        }
      ];
    }
    else if (this.passwordMismatch) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Your passwords don't match. Please enter your password again.`
        }
      ];
    }
    else if (!this.name) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please type in your name to continue.`
        }
      ];
    }
    else if (!this.email) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide your email address to continue.`
        }
      ];
    }
    else if (!this.validateService.validateRegister(user)) {
      this.alerts = [
        {
          type: 'danger',
          msg: `You have to complete the form correctly first before submitting it.`
        }
      ];
    }
    // validate Email
    else if (!this.validateService.validateEmail(user.email)) {
      // additionally
      this.emailInvalid = true;

      this.alerts = [
        {
          type: 'danger',
          msg: `The e-mail address you have entered seems to be invalid. Please use a valid email to continue.`
        }
      ];
    }
    // register User
    else this.userService.registerMod(user).subscribe(data => {
      if (data['success']) {
        this.alerts = [
          {
            type: 'success',
            msg: `moderator registered`
          }
        ];
      }
      else if (data['username_exist']) {
        this.alerts = [
          {
            type: 'warning',
            msg: `You can't register because an account with the username <strong>` + this.username + `</strong> already exist. Please try another username!`
          }
        ];
      } else {
        this.alerts = [
          {
            type: 'danger',
            msg: `Something went wrong! Please try again later.`
          }
        ];
      }
    });
  }

  //  public scatterChartData: ChartDataSets[] = [
  //    {
  //      data: [
  //        { x: 1, y: 1 },
  //        { x: 2, y: 3 },
  //        { x: 3, y: -2 },
  //        { x: 4, y: 4 },
  //        { x: 5, y: -3, r: 20 },
  //              ],
  //    label: 'Series A',
  //    pointRadius: 10,
  //  },
  //  ];

  public scatterChartType: ChartType = 'scatter';

  openRegister(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}


