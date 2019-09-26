import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})
export class NewCampaignComponent implements OnInit {
  name: string;
  description: string;
  target: number;
  deadline: Date;

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
  }

  onCreateCampaign() {
    const campaign = {
      name: this.name,
      description: this.description,
      target: this.target,
      deadline: this.deadline,
      raised: 0
    }

    // register User
    this.campaignService.createCampaign(campaign).subscribe(data => {
      if (data['success']) {
        console.log("success")
      } else {
        console.log("error")
      }
    });
  }

}
