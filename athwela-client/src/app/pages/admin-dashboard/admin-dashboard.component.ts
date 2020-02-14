import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label, ChartsModule, } from 'ng2-charts';
import{Chart} from 'chart.js';
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

  ) { }
  BarChart=[];

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

  //barchart
// getbarchart(){
//   this.userservice.getcharts().subscribe((res)=>{

//   });
// }
   barchart=new Chart('barchart',{
     type:'bar',
     data:{
       datasets:[
         {
           label:"Total Users",
           backgroundColor:"rgba(255,99,132,0.2)",
           borderColor:"rgba(193,7,218,0.6)",
           borderWidth:1,
           data:[10]
         },
         {
          label:"Total Moderators",
          backgroundColor:"rgba(193,7,218,0.34)",
          borderColor:"rgba(193,7,218,0.6)",
          borderWidth:1,
          data:[20]
        }

       ]
     }
   })
}




