import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {
  @Input() public id: string;
  @Input() public name: string;
  @Input() public description: string;
  @Input() public raised: string;
  @Input() public target: string;
  @Input() public isLinked: boolean = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
