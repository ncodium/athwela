import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from 'src/app/services/user.service';


import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss']
})
export class AdminModeratorsComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  passwordConfirm: String;

  nameInvalid: boolean;
  emailInvalid: boolean;
  usernameInvalid: boolean;
  passwordInvalid: boolean;
  passwordMismatch: boolean;

  alerts: any = [];

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    public bsModalRef: BsModalRef
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
   }

   onRegisterSubmit() {
    // generate an object from the data provided in fields
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
 
    }

    this.highlightInvalidInputFields();
    // required fields
    if (!this.username && !this.email && !this.password && !this.name) {
      this.alerts = [
        {
          type: 'warning',
          msg: `You have to complete the form correctly first before submitting it.`
        }
      ];
    }


//   public scatterChartOptions: ChartOptions = {
//    responsive: true,
//  };

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  }
}

