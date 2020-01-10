import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { CampaignService } from '../../services/campaign.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Campaign } from '../../models/campaign.model';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [CampaignService, UserService]

})
export class AdminDashboardComponent implements OnInit {
  public barChartLabels: Label[] = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july'];
  users;
  moderators;
  campaigns: Campaign[];
  donations;

  campaignsCount = 0;
  donationsCount;
  userCount;
  moderatorCount;
  totalreq = 0;



  constructor(
    private campaignService: CampaignService,
    private userservice: UserService,

  ) {}

  ngOnInit(


  ) {
    this.getmods();
    this.getall();
    this.getAllCampaigns();
    this.gettotalreq();
  }
  //
  getmods() {
    this.userservice.getmoderators().subscribe((res) => {
      this.moderators = res['users'] as User[];
      this.moderatorCount = this.moderators.length;

    });
  }
  //
  getall() {
    this.userservice.getallusers().subscribe((res) => {
      this.users = res['users'] as User[];
      this.userCount = this.users.length;


    });
  }
  //get total count
  gettotalreq() {
    this.userservice.gettotalcount().subscribe((res) => {
      this.totalreq = res['count'];
    });
  }


  getAllCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.campaignsCount = this.campaigns.length;
      
    });
  }




  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public polarAreaChartLabels: Label[] = ['Total requests', 'Approved requests', 'Declined requests', 'Pending requests'];
  public polarAreaChartData: SingleDataSet = [this.totalreq, 5, 1, 4];
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

