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
  sortBy = ['Trending', 'Date', 'Comments', 'Donations', 'Name'];
  currentSort: string;
  word: string;  // Get currentSort to word variable
  sortWord: string;
  elseCatogory: string;

  currentPage: number; // use for pagination
  page: number; // use for pagination
  resCount: number;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.sortCampaigns(this.currentSort);
    this.refreshCategories();
    this.campaignService.getPublishedCategoryCount().subscribe((res) => {
        if (res['success']) this.resCount = res['categoriesCount'];

      });
    this.onCategoryChange(this.defaultCategory);
  }

  // get data by page number
  pageChanged(event: any): void {
    this.page = event.page;

    if (this.activeCategory === this.defaultCategory && this.word === undefined) {                     // get publish campaigns data
      this.campaignService.getPublishedCampaignsCatogory(this.page).subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];

      });
    } else if (this.activeCategory === this.elseCatogory) {                                            // get campaigns data by category
      this.campaignService.getCategoryCampaign(this.activeCategory , this.page).subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];

      });
    } else if ( this.activeCategory === this.defaultCategory && this.word === this.sortWord) {         // get sort campaigns data
      this.campaignService.getSortCampaign(this.word , this.page).subscribe((res) => {
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
      });

    }

  }

  // sort campaigns data
  sortCampaigns(currentSort: string) {
    this.word = currentSort;
    this.sortWord = currentSort;
    this.campaignService.getSortCampaign(currentSort , 1).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });

    // get sort campaigns count
    this.campaignService.getSortCount(currentSort).subscribe((res) => {
      if (res['success']) this.resCount = res['sortCount'];
    });

  }

  onCategoryChange(category: string) {
    this.activeCategory = category;
    if (this.activeCategory === this.defaultCategory) {
      this.campaignService.getPublishedCampaignsCatogory(1).subscribe((res) => {          // get publish campaigns data for page 1
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];

      });

      this.campaignService.getPublishedCategoryCount().subscribe((res) => {               // get publish campaigns data count
        if (res['success']) this.resCount = res['categoriesCount'];

      });

    } else {
      this.elseCatogory = this.activeCategory;
      this.campaignService.getCategoryCampaign(category , 1).subscribe((res) => {         // get campaigns data by category
        if (res['success']) this.campaigns = res['campaigns'] as Campaign[];

      });

      this.campaignService.getCategoryCount(this.activeCategory).subscribe((res) => {     // get campaigns data category count
        if (res['success']) this.resCount = res['categoriesCount'];

      });

    }
  }

  refreshCategories() {
    this.campaignService.getCategories().subscribe((res) => {
      if (res['success']) this.categories = res['categories'] as string[];
    });
  }
}
