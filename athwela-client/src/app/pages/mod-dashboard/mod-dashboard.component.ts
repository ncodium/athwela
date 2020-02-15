import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserService } from 'src/app/services/user.service';
import { DonationService } from 'src/app/services/donation.service';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { Donation } from '../../models/donation.model';
import { Subscription } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../components/register/validators/confirm-password.validator';
import { StatsService } from '../../services/stats.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { AppConfig } from 'src/app/config/app-config';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Component({
  selector: 'app-mod-dashboard',
  templateUrl: './mod-dashboard.component.html',
  styleUrls: ['./mod-dashboard.component.scss'],
  providers: [CampaignService]
})
export class ModDashboardComponent implements OnInit {
  routeSub: Subscription;
  modalRef: BsModalRef;
  uploader: FileUploader;
  response: any;
  alert: any;
  user: User;
  count: Object;
  categoryCount: any;
  statusCount: any;
  monthlyCount: any;
  monthlyDonations: any;

  updateForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private donationService: DonationService,
    private formBuilder: FormBuilder,
    private statsService: StatsService
  ) {
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo',
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedMimeType: ['image/png', 'image/jpeg'] //will be loaded only PNG and JPG files
    });

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.user = this.authService.getUser(); // get logged in user

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully!');
      this.avatar.setValue(AppConfig.BASE_URL + this.response.path);
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG or JPEG formats with size less than 5MB.');
    }

    this.updateForm = this.formBuilder.group({
      avatar: [],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      phone: [this.user.phone],
      password: [''],
      confirmPassword: [''],
      firstName: [this.user.firstName, [
        Validators.required
      ]],
      lastName: [this.user.lastName, [
        Validators.required
      ]],
      address: [this.user.address, [
        Validators.required
      ]],
      city: [this.user.city, [
        Validators.required
      ]],
    },
      { validator: ConfirmPasswordValidator.matchPassword }
    );



    this.statsService.getCount().subscribe((res) => {
      this.count = res as Object;
    });

    this.statsService.getCategoryCount().subscribe((res) => {
      this.categoryCount = res as Object;
      // console.log(this.categoryCount);
      this.categoryPieChartLabels = this.categoryCount.map(i => this.toTitleCase(i._id));
      this.categoryPieChartData = this.categoryCount.map(i => i.count);
    });

    this.statsService.getStatusCount().subscribe((res) => {
      this.statusCount = res as Object;
      // console.log(this.categoryCount);
      this.statusPieChartLabels = this.statusCount.map(i => {
        const _id = i._id;
        if (_id.published) return 'Published';
        else if (_id.verified) return 'Verified';
        else return 'Pending';
      });
      this.statusPieChartData = this.statusCount.map(i => i.count);
    });

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


    this.statsService.getMonthlyDonations().subscribe((res) => {
      this.monthlyDonations = res as Object;
      console.log(this.monthlyDonations);

      this.barChartLabels = this.monthlyDonations.map(i => i._id.year + ' ' + monthNames[i._id.month]);
      this.barChartData = [
        { data: this.monthlyDonations.map(i => i.total), label: 'Donations' },
      ];
      // ['January', 'February', 'March', 'April', 'May', 'June'];
    });


  }

  onClose() {
    this.modalService.hide(1);
  }

  openSettings(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onUpdate() {
    const user: User = {
      _id: this.user._id,
      avatar: this.avatar.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      phone: this.phone.value,
      city: this.city.value
    }

    this.authService.updateUser(user).subscribe((res) => {
      if (res['success']) {
        this.user = res['user'] as User;
        this.authService.storeUserProfile(this.user);

        // feedback
        this.alert = {
          type: 'success',
          msg: 'Your details has been updated successfully.'
        }
      }
      else {
        this.alert = {
          type: 'danger',
          msg: res['msg']
        }
      }
    })
  }

  get avatar() {
    return this.updateForm.get('avatar');
  }

  get phone() {
    return this.updateForm.get('phone');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get confirmPassword() {
    return this.updateForm.get('confirmPassword');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get address() {
    return this.updateForm.get('address');
  }

  get city() {
    return this.updateForm.get('city');
  }

  // Pie
  public categoryPieChartOptions: ChartOptions = {
    responsive: true,
  };
  public categoryPieChartLabels: Label[]; // ['Download', 'Store', 'Sales'];
  public categoryPieChartData: SingleDataSet; // [300, 500, 100];
  public categoryPieChartType: ChartType = 'pie';
  public categoryPieChartLegend = true;
  public categoryPieChartPlugins = [];

  public statusPieChartOptions: ChartOptions = {
    responsive: true,
  };
  public statusPieChartLabels: Label[]; // ['Download', 'Store', 'Sales'];
  public statusPieChartData: SingleDataSet; // [300, 500, 100];
  public statusPieChartType: ChartType = 'pie';
  public statusPieChartLegend = true;
  public statusPieChartPlugins = [];

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

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

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
}
