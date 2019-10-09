import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  categories: string[] = ["all", "medical", "education"]
  active: string = "all";

  constructor() { }

  ngOnInit() {
  }

  onCategoryClick(category: string) {
    this.active = category;
  }

}
