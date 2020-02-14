import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SearchService } from '../services/search.service';
import { Campaign } from '../models/campaign.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  campaigns: Campaign[];

  constructor(
    public router: Router
  ) { }

  ngOnInit() { }

  search(f: NgForm) {
    this.router.navigate(['/search', f.value.search]);
  }

}
