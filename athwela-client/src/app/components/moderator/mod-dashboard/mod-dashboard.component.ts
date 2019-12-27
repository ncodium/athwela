import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

import { Campaign } from '../../../models/campaign.model';
import { CampaignService } from '../../../services/campaign.service';


@Component({
  selector: 'app-mod-dashboard',
  templateUrl: './mod-dashboard.component.html',
  styleUrls: ['./mod-dashboard.component.scss'],
  providers: [CampaignService]
})
export class ModDashboardComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      }
    );
  }


}
