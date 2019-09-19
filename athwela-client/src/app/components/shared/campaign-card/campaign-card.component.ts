import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() deadline: string;
  @Input() target: string;

  constructor() { }

  ngOnInit() {
  }

}
