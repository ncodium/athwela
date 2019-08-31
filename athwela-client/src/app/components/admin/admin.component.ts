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
    
  }

}
