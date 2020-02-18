import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReportService } from '../../services/Report.service';
import { Campaign } from '../../models/campaign.model';
import { Donation } from '../../models/donation.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {
  reportForm: FormGroup;
  campaigns: Campaign[];
  donations: Donation[];
  alert: any;
  fromalert: any;
  toalert: any;


  constructor(
    private formBuilder: FormBuilder,
    private reportservice: ReportService,
  ) { }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      fromDate: ['', [
        Validators.required,
      ]],
      toDate: ['', [
        Validators.required,
      ]],
    });
  }

  get fromDate() {
    return this.reportForm.get('fromDate');
  }

  get toDate() {
    return this.reportForm.get('toDate');
  }

  onSubmitCampaigns() {
    //console.log(this.fromDate.invalid, this.toDate.invalid)
    this.fromalert = this.toalert = null;
    this.alert = null;
    if (this.fromDate.invalid || this.toDate.invalid) {
      if (this.fromDate.invalid) {
        this.fromalert = {
          type: 'danger',
          msg: 'Begin date is empty'
        }
      }
      if (this.toDate.invalid) {
        this.toalert = {
          type: 'danger',
          msg: 'End date is empty'
        }
      }
    }
    else if (this.fromDate.value > this.toDate.value) {
      this.alert = {
        type: 'danger',
        msg: 'Begin date should be less than end date'
      }
    }
    else {
      this.reportservice.getCampaignsbydate(this.fromDate.value, this.toDate.value).subscribe((res) => {
        this.campaigns = res as Campaign[];
        this.generatePdf();
      });
      //}
      // else {
      //   this.alert = {
      //     type: 'danger',
      //     msg: 'fromDate should be less than Todate'
      //   }
      // }
    }
  }

  generatePdf() {
    var rows = [];
    rows.push(['Name', 'Owner', 'Target', 'Deadline', 'Category']);


    for (var i of this.campaigns) {
      rows.push([i.name, [i.owner.firstName + i.owner.lastName + ' ' + i.owner.email], 'Rs.' + i.target, i.deadline.toString(), this.toTitleCase(i.category)]);
    }

    var docDefinition = {
      content: [


        { text: 'Campaigns Report', fontSize: 20, bold: true, margin: [5, 2, 10, 20] },

        { text: 'From ' + this.fromDate.value + ' To ' + this.toDate.value, fontSize: 15, bold: true, margin: [5, 2, 10, 20] },


        {
          table: {

            // widths: ['*', 100, 200, '*', '*', '*'],
            body: rows
          }
        }
      ]
    }
    pdfMake.createPdf(docDefinition).download();
  }

  //print donations
  onSubmitDonations() {
    this.fromalert = this.toalert = null;
    this.alert = null;
    if (this.fromDate.invalid || this.toDate.invalid) {
      if (this.fromDate.invalid) {
        this.fromalert = {
          type: 'danger',
          msg: 'fromDate is empty'
        }
      }
      if (this.toDate.invalid) {
        this.toalert = {
          type: 'danger',
          msg: 'toDate is empty'
        }
      }
    }
    else {

      this.reportservice.getDonationsbydate(this.fromDate.value, this.toDate.value).subscribe((res) => {


        this.donations = res as Donation[];

        this.generatePdfDonations(this.donations);
      });
    }
  }

  generatePdfDonations(donations: Donation[]) {
    var rows = [];
    rows.push(['Donation Id', 'Amount', 'Status Code', 'Status Message', 'Method']);


    for (var i of this.donations) {
      rows.push([i.donation_id, 'Rs.' + i.amount, i.status_code, i.status_message, i.method]);
    }

    var docDefinition = {
      content: [


        { text: 'Donations Report', fontSize: 20, bold: true, margin: [5, 2, 10, 20] },

        { text: 'From ' + this.fromDate.value + ' To ' + this.toDate.value, fontSize: 15, bold: true, margin: [5, 2, 10, 20] },


        {
          table: {

            // widths: ['*', 100, 200, '*', '*', '*'],
            body: rows
          }
        }
      ]
    }
    pdfMake.createPdf(docDefinition).download();
  }

  //
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


}


