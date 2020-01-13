import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SingleDataSet } from 'ng2-charts';
import { Donation } from '../../models/donation.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-donations',
  templateUrl: './admin-donations.component.html',
  styleUrls: ['./admin-donations.component.scss']
})
export class AdminDonationsComponent implements OnInit {
  donations: Donation[];
  alert: any;

  constructor(
    private donationService: DonationService,
    private modalService: BsModalService,
  ) { }
  ngOnInit() { }
  getUserDonations(id: string) {
    this.donationService.getUserDonations(id).subscribe((res) => {
      this.donations = res['donations'] as Donation[];
    });
  }

}
