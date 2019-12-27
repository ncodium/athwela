import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  categories: string[]
  defaultCategory: string = "All Categories"
  activeCategory: string = this.defaultCategory;

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshCategories();
  }

  onCategoryChange(category: string) {
    this.activeCategory = category;
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
