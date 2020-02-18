import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { Campaign } from '../../models/campaign.model';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  campaigns: Campaign[];
  routeSub: Subscription;
  searchText: string;
  searchCount: number;

  currentPage: number;
  page: number;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.searchText = params['search']; // require campaignId from URL and request campaign content
      this.searchQuery(this.searchText);
    });

    this.searchService.getsearchCount(this.searchText).subscribe((res) => {
      if (res['success']) this.searchCount = res['campaignsCount'];
    });
  }


  search(f: NgForm) {
    // console.log(f.value.search);
    this.router.navigate(['/search', f.value.search]);
    this.searchService.getSearch(f.value.search, 1).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
    this.searchService.getsearchCount(this.searchText).subscribe((res) => {
      if (res['success']) this.searchCount = res['campaignsCount'];
    });
  }

  searchQuery(query: string) {
    this.router.navigate(['/search', query]);
    this.searchService.getSearch(query, 1).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
    this.searchService.getsearchCount(this.searchText).subscribe((res) => {
      if (res['success']) this.searchCount = res['campaignsCount'];
    });


  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.searchService.getSearch(this.searchText, this.page).subscribe((res) => {
      if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
  }

}
