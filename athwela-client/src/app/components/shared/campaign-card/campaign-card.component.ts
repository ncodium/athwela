import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {
  @Input() public name: string;
  @Input() public description: string;
  @Input() public raised: string;
  @Input() public target: string;

  constructor() { }

  ngOnInit() {
  }

}
