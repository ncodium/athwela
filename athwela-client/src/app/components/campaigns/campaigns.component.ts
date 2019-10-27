import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  categories: string[] = ["all", "medical", "education"]
  active: string = "all";

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshCategories();
  }

  onCategoryChange(category: string) {
    this.active = category;
  }

  refreshCategories() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.categories = res as string[];
    });
  }

}
