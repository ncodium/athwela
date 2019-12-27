import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignCardComponent implements OnInit {
  @Input() public id: string;
  @Input() public name: string;
  @Input() public description: string;
  @Input() public raised: string;
  @Input() public target: string;
  @Input() public isLinked: boolean = true;
  @Input() public hideDonate: boolean = true;
  @Input() public published: boolean = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }
}
