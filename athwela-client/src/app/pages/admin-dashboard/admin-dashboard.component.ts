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
import { Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
  count: Object;
  userModelCount:any;
  campaignsCategoryCount:any;
  monthlyCount: any;
  monthlyDonations: any;
  categoryCount: any;

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
  this.PieChartLabels = this.userModelCount.map(i => {
    if (i._id=='user')
    return 'User';
    if(i._id=='mod')
    return 'Moderator';
    if(i._id=='admin')
    return 'Administrator';
  });
  this.PieChartData = this.userModelCount.map(i => i.count);
});

//getting campaigns to a barchart
this.statsService.getMonthlyDonations().subscribe((res) => {
  this.monthlyDonations = res as Object;
  console.log(this.monthlyDonations);

  this.barChartLabels = this.monthlyDonations.map(i => i._id.year + ' ' + monthNames[i._id.month]);
  this.barChartData = [
    { data: this.monthlyDonations.map(i => i.total), label: 'Donations' },
  ];
  // ['January', 'February', 'March', 'April', 'May', 'June'];
});

//getting donations to a line chart
this.statsService.getMonthlyCount().subscribe((res) => {
  this.monthlyCount = res as Object;
  // console.log(this.monthlyCount);

  this.lineChartData = [
    { data: this.monthlyCount.map(i => i.count), label: 'Campaigns' },
  ];
  // console.log(this.lineChartData);

  this.lineChartLabels = this.monthlyCount.map(i => i._id.year + ' ' + monthNames[i._id.month]);
  // console.log(this.lineChartLabels);
  // ['January', 'February', 'March', 'April', 'May', 'June'];
});

this.statsService.getCount().subscribe((res) => {
  this.count = res as Object;
});

//categories to piechart
this.statsService.getCategoryCount().subscribe((res) => {
  this.categoryCount = res as Object;
  // console.log(this.categoryCount);
  this.categoryPieChartLabels = this.categoryCount.map(i => this.toTitleCase(i._id));
  this.categoryPieChartData = this.categoryCount.map(i => i.count);
});

 


  }
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  getModerators() {
    this.userservice.getModerators().subscribe((res) => {
      this.moderators = res['moderators'] as User[];
      this.moderatorCount = this.moderators.length;

    });
  }

  getAllUsers() {
    this.userservice.getAllusers().subscribe((res) => {
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
 
//bar
public barChartOptions: ChartOptions = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return 'Rs.' + value;
          }
        }
      }
    ]
  }
};
public barChartType: ChartType = 'bar';
public barChartLegend = false;
public barChartPlugins = [];

public barChartColors: Color[] = [
  {
    borderColor: 'darkgreen',
    backgroundColor: 'rgba(102, 187, 106, 0.75)',
  },
];

public barChartLabels: Label[];
public barChartData: ChartDataSets[];

//linechart
lineChartData: ChartDataSets[];
lineChartLabels: Label[];

lineChartOptions = {
  responsive: true,

  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    ]
  }
};

lineChartColors: Color[] = [
  {
    borderColor: 'darkred',
    backgroundColor: 'rgba(239, 83, 80, 0.5)',
  },
];

lineChartLegend = false;
lineChartPlugins = [];
lineChartType = 'line';

//category pie chart
public categoryPieChartOptions: ChartOptions = {
  responsive: true,
};
public categoryPieChartLabels: Label[]; // ['Download', 'Store', 'Sales'];
public categoryPieChartData: SingleDataSet; // [300, 500, 100];
public categoryPieChartType: ChartType = 'pie';
public categoryPieChartLegend = true;
public categoryPieChartPlugins = [];
}




