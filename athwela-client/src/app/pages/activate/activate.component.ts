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
  alert: boolean = false;
  tempToken: string;

  user: User;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tempToken = this.route.snapshot.paramMap.get("temporaryToken");
  }

  activateAccount() {
    console.log(this.tempToken);
    this.authService.activateUser(this.tempToken).subscribe((res) => {
      console.log(res);
      if (res['success']) {
        alert('Successfully activated your account. Please sign in again.');
        this.router.navigate(['/']);

      }
      else {
        alert(res['msg']);
      }
    })
  }

}
