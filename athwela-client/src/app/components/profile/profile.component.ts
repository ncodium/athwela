import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private routeSub: Subscription;
  private user: User;
  private currentUser: User;
  private userId: string;
  private isVisitor: boolean;

  campaigns: Campaign[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; // acquire userId from URL
      if (this.userId) {
        this.userService.getUser(this.userId).subscribe((res) => {
          if (res['success']) this.user = res['user'] as User;
          else this.router.navigate(['/page-not-found']);

          // identify if the user is visitor or not
          if (this.user._id == this.currentUser._id) this.isVisitor = false;
          else this.isVisitor = true;
        })
      }
      else {
        this.user = this.currentUser;
        this.isVisitor = false; // is the owner
      }
      this.getUserCampaignList();
    });
  }

  refreshUserCampaignList(user: User) {
    this.campaignService.getCampaignList().subscribe((res) => {
      if (res['success']) this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getUserCampaignList() {
    this.campaignService.getCampaignList().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      console.log(this.campaigns);
    });
  }
}
