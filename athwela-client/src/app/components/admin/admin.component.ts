import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username: String;
  password: String;

  alerts: any = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data['success']) {
        this.authService.storeUserData(data['token'], data['user']);
        this.alerts = [
          {
            type: 'success',
            msg: `You are not logged in!`
          }
        ];
        this.router.navigate(['dashboard']);
      } else {
        console.log(data);
        this.alerts = [
          {
            type: 'success',
            msg: data['msg']
          }
        ];
        this.router.navigate(['login']);
      }
    });
  }
}



