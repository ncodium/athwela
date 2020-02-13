import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label, ChartsModule, } from 'ng2-charts';
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

  ) { }

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
  getapprovedreq() {
    this.userservice.getaprovedcount().subscribe((res) => {
      this.totalreq = res['count'];
      this.polarAreaChartData.splice(1, 0, res['count']);
    });
  }

  getCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.campaignsCount = this.campaigns.length;
    });
  }

  public polarAreaChartLabels: Label[] = ['Total requests', 'Approved requests', 'Declined requests', 'Pending requests'];
  public polarAreaChartData: SingleDataSet = [1, 4];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
  //for table
  elements: any = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter' },
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];

  //for bar chart
  public SystemName: string = "MF1";
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [1, 8, 49];

  public labelMFL: Array<any> = [
    {
      data: this.lineChartData,
      label: this.SystemName
    }
  ];
  // labels
  public lineChartLabels: Array<any> = ["2018-01-29 10:00:00", "2018-01-29 10:27:00", "2018-01-29 10:28:00"];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 60,
          min: 0,
        }
      }],
      xAxes: [{

      }],
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        //color: "#2756B3",
        color: "#222",

        font: {
          family: 'FontAwesome',
          size: 14
        },

      },
      deferred: false

    },

  };

  _lineChartColors: Array<any> = [{
    backgroundColor: 'red',
    borderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: 'red',
    pointHoverBorderColor: 'red'
  }];



  public ChartType = 'bar';

  public chartClicked(e: any): void {
    // console.log(e);
  }
  public chartHovered(e: any): void {
    // console.log(e);
  }

}

