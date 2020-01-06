import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';

import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  categories: string[];
  defaultCategory: string = "All Categories";
  activeCategory: string = this.defaultCategory;
  campaigns: Campaign[];

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshCategories();
    this.onCategoryChange(this.defaultCategory);
  }

  onCategoryChange(category: string) {
    this.activeCategory = category;
    if (this.activeCategory === this.defaultCategory) {
      this.campaignService.getPublishedCampaigns().subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
        console.log(res);
      })
    }
    else {
      this.campaignService.getCategoryCampaign(category).subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
        console.log(res);
      })
    }
  }

  refreshCategories() {
    this.campaignService.getCategories().subscribe((res) => {
      if (res['success']) this.categories = res['categories'] as string[];
      else {
        // error
      }
    });
  }
}
