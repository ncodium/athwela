import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label,ChartsModule, } from 'ng2-charts';
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
   

  users;
  moderators;
  donations;
  campaigns: Campaign[];

  campaignsCount;
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
    this.getModerators();
    this.getUsers();
    this.getCampaigns();
    this.gettotalreq();
    this.getapprovedreq();
    
  }

  getModerators() {
    this.userservice.getModerators().subscribe((res) => {
      this.moderators = res['users'] as User[];
      this.moderatorCount = this.moderators.length;

    });
  }

  getUsers() {
    this.userservice.getUsers().subscribe((res) => {
      this.users = res['users'] as User[];
      this.userCount = this.users.length;
    });
  }
  //get total count
  gettotalreq() {
    this.userservice.gettotalcount().subscribe((res) => {
      this.totalreq = res['count'];
      this.polarAreaChartData.unshift(res['count']);
    });
  }
  
//get approved request count
getapprovedreq(){
  this.userservice.getaprovedcount().subscribe((res) => {
    this.totalreq = res['count'];
    console.log(this.totalreq)
    this.polarAreaChartData.splice(1,0,res['count']);
  });
}




  getCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.campaignsCount = this.campaigns.length;
    });
  }

  public polarAreaChartLabels: Label[] = ['Total requests', 'Approved requests', 'Declined requests', 'Pending requests'];
  public polarAreaChartData: SingleDataSet = [ 1, 4];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

   
}

