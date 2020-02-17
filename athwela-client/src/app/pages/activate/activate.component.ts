import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  alert: string;
  tempToken: string;

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tempToken = this.route.snapshot.paramMap.get("temporaryToken");
    this.activateAccount();
  }
  
  activateAccount(
    
  ) {
    
    console.log(this.tempToken);


    this.authService.activateUser(this.tempToken).subscribe((res) => {
      if (res['success']) {
        
      }
      else {
        
      }
    })
  }

}
