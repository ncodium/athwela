import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../services/campaign.service';
// import { Campaign } from '../models/campaign.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: string;

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.searchText(this.search);
  }

  searchText(search: string) {
    console.log(search);
  }

}
