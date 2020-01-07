import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [CampaignService]
})
export class AdminDashboardComponent implements OnInit {
  public barChartLabels: Label[] = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july'];

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() { }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public polarAreaChartLabels: Label[] = ['Total requests', 'Approved requests', 'Declined requests', 'Pending requests'];
  public polarAreaChartData: SingleDataSet = [700, 500, 100, 40];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Donations' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Campaingns' }
  ];
}
