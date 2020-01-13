import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmPasswordValidator } from './../../components/register/validators/confirm-password.validator';
import { UsernameValidator } from './../../components/register/validators/username.validator';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  //providers: [UserService]
})
export class AdminUsersComponent implements OnInit {
  modalRef: BsModalRef;
  users: User[];
  moderators: User[];
  registerForm: FormGroup;

  alert: any;


  ngOnInit() {
    this.getUsers();
    this.getModerators();

    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ],
        UsernameValidator.createValidator(this.authService)
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
    },
      { validator: ConfirmPasswordValidator.matchPassword }
    );
  }

  onRegister() {
    this.userService.registerMod({
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      phone: this.phone.value,
      city: this.city.value
    }).subscribe((res) => {
      if (res['success']) {
        this.alert = {
          type: 'success',
          msg: 'Thank you for registering on Athwela. You may now sign in.'
        }
      }
      else {
        this.alert = {
          type: 'danger',
          msg: res['msg']
        }
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res['users'] as User[];
    });
  }

  getModerators() {
    this.userService.getModerators().subscribe((res) => {
      this.moderators = res['users'] as User[];
    });
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService
  ) { }

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

  public scatterChartType: ChartType = 'scatter';

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get city() {
    return this.registerForm.get('city');
  }
}
