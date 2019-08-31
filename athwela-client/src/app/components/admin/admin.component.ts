import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: NgFlashMessageService 
  ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user={
    username:this.username,
    password:this.password
    }
    
  
  this.authService.authenticateUser(user).subscribe(data => {
    if(data['success']){
      this.authService.storeUserData(data['token'], data['user']);
      this.flashMessage.showFlashMessage({
        messages: ["You logged as admin"],
        dismissible: false,
        timeout: 5000,
        type: 'success'
      });
      this.router.navigate(['dashboard']);
    } else {
      console.log(data);
      this.flashMessage.showFlashMessage({
        messages: [data['msg']],
        dismissible: false,
        timeout: 5000,
        type: 'danger'
      });
      this.router.navigate(['login']);
    }
  });
}
}



