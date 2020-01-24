import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm }   from '@angular/forms';

import { SearchService } from '../services/search.service';
// import { Campaign } from '../models/campaign.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //search: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    // this.searchText(this.search);
  }

  searchText(search: string) {
    console.log(search);
    this.searchService.getSearch(search).subscribe((res) => {
      console.log(search);
    });
    // this.route.params.subscribe(params => {
    //   this.search = params.search;
    //   console.log(search);
    // });
  }

  search(f: NgForm) {
    console.log(f.value.search );
    this.router.navigate(['/search-page', f.value.search])
  }

}
