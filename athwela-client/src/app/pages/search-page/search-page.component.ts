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

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
    this.searchText = params['search']; // acquire campaignId from URL and request campaign content
    this.searchQuery(this.searchText);
  });
}

  search(f: NgForm) {
    console.log(f.value.search );
    this.router.navigate(['/search', f.value.search]);
    this.searchService.getSearch(f.value.search).subscribe((res) => {
      console.log(f.value.search);
      console.log(this.campaigns.length);
     if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  searchQuery(query: string) {
    this.router.navigate(['/search', query]);
    this.searchService.getSearch(query).subscribe((res) => {
      console.log(query);
     if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  // searchCampaigns(Search: string) {
  //   this.SearchService.getSearch(Search).subscribe((res) => {
  //     if (res['success']) this.campaigns = res['campaigns'] as Campaign[];
  //   });
  // }

}
