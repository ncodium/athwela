import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  // defaultSort: string = "Trending";
  currentSort: string;
  sortBy = ['Trending', 'Date', 'Comments', 'Donations' , 'Name'];
  word: string;  // Get currentSort to word variable

  currentPage: number;                // use for pagination
  page: number;                       // use for pagination
  resCount: number;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.sortCampaigns(this.currentSort);
    this.refreshCategories();
    this.onCategoryChange(this.defaultCategory);
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.campaignService.getSortCampaign(this.word , this.page).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  sortCampaigns(currentSort: string) {
    this.word = currentSort;
    this.campaignService.getSortCampaign(currentSort , 1).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });

    this.campaignService.getSortCount(currentSort).subscribe((res) => {
      if (res['success']) this.resCount = res['sortCount'];
    });

  }

  onCategoryChange(category: string) {
    this.activeCategory = category;
    if (this.activeCategory === this.defaultCategory) {
      this.campaignService.getPublishedCampaigns().subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
      });
    } else {
      this.campaignService.getCategoryCampaign(category).subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
      });
    }
  }

  refreshCategories() {
    this.campaignService.getCategories().subscribe((res) => {
      if (res['success']) this.categories = res['categories'] as string[];
    });
  }
}
