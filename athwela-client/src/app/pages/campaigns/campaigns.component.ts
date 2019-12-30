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
  publishedCampaigns: Campaign[];

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshCategories();
    this.getPublishedCampaigns();
  }

  getPublishedCampaigns() {
    this.campaignService.getPublishedCampaigns().subscribe((res) => {
      this.publishedCampaigns = res['campaigns'] as Campaign[];
    });
  }



  onCategoryChange(category: string) {
    this.activeCategory = category;
    // /cateogis/categry
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
