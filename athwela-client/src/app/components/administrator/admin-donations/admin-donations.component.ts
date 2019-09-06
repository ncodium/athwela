import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-admin-donations',
  templateUrl: './admin-donations.component.html',
  styleUrls: ['./admin-donations.component.scss']
})
export class AdminDonationsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'donations' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'requests' }
  ];
  public polarAreaChartLabels: Label[] = ['Total requests', 'Verified requests', 'Approved requests', 'Diclined requests', 'Pending Requests'];
  public polarAreaChartData: SingleDataSet = [700, 500, 300, 150, 50];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';


  constructor() { }

  ngOnInit() {
  }

}
