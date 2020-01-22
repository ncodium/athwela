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
  @Input() public raised: number;
  @Input() public target: number;
  @Input() public isLinked: boolean = true;
  @Input() public hideDonate: boolean = true;
  @Input() public published: boolean = false;
  percentage: number;

  constructor(
    private router: Router,
  ) { }

  generatePercentage() {
    const percentage = this.raised / this.target * 100;
    if (percentage > 100) this.percentage = 100;
    else this.percentage = percentage;
    console.log(this.percentage);
  }

  ngOnInit() {
    this.generatePercentage();
   }
}
