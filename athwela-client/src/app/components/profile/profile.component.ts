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
  private userId: string;
  private visitor: boolean;

  campaigns: Campaign[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; // acquire userId from URL
      if (this.userId) {
        this.userService.getUser(this.userId).subscribe((res) => {
          if (res['success']) this.user = res['user'] as User;
          else {
            this.router.navigate(['/page-not-found']);
          }
        })
      }
      else {
        this.user = this.authService.getUser();
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
