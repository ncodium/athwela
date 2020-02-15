import { Component, OnInit } from '@angular/core';
//import { SingleDataSet, Label, ChartsModule, } from 'ng2-charts';
//import{Chart} from 'chart.js';
import { CampaignService } from '../../services/campaign.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Campaign } from '../../models/campaign.model';
import { StatsService } from '../../services/stats.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [CampaignService, UserService]

})
export class AdminDashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  users;
  moderators;
  donations;
  campaigns: Campaign[];

  campaignsCount;
  donationsCount;
  userCount;
  moderatorCount;
  totalreq = 0;
  count: Object;
  userModelCount:any;
  campaignsCategoryCount:any;
  

  constructor(
    private campaignService: CampaignService,
    private userservice: UserService,
    private statsService: StatsService

  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }
  

  ngOnInit(
  ) {
    this.getModerators();
    this.getAllUsers();
    this.getCampaigns();
    this.gettotalreq();
    this.getapprovedreq();

//getiing users to a piechart
this.statsService.getUserModelCount().subscribe((res) => {
  this.userModelCount = res as Object;
  //console.log(this.categoryCount);
  this.PieChartLabels = this.userModelCount.map(i => i._id);
  this.PieChartData = this.userModelCount.map(i => i.count);
});

//getting campaigns to a barchart

 


  }

  getModerators() {
    this.userservice.getModerators().subscribe((res) => {
      this.moderators = res['moderators'] as User[];
      this.moderatorCount = this.moderators.length;

    });
  }

  getAllUsers() {
    this.userservice.getAllusers().subscribe((res) => {
      this.users = res['allusers'] as User[];
      this.userCount = this.users.length;
    });
  }
  //get total count
  gettotalreq() {
    this.userservice.gettotalcount().subscribe((res) => {
      this.totalreq = res['count'];
      
    });
  }

  //get approved request count
  getapprovedreq() {
    this.userservice.getaprovedcount().subscribe((res) => {
      this.totalreq = res['count'];
      
    });
  }

  getCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.campaignsCount = this.campaigns.length;
    });
  }

   




//pie
public PieChartOptions: ChartOptions = {
  responsive: true,
};
public PieChartLabels: Label[] = []; // ['Download', 'Store', 'Sales'];
public PieChartData: SingleDataSet = []; // [300, 500, 100];
public PieChartType: ChartType = 'pie';
public PieChartLegend = true;
public PieChartPlugins = [];
public pieChartColors = [ {
  backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
}];
 
}




