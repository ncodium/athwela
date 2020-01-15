import { Component, OnInit } from '@angular/core';

import { SearchService } from '../services/search.service';
// import { Campaign } from '../models/campaign.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: string;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    // this.searchText(this.search);
  }

  searchText(search: string) {
    console.log(search);
    this.searchService.getSearch(search).subscribe((res) => {
      console.log(search);
    });
  }

}
