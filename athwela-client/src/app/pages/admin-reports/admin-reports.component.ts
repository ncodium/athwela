import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReportService } from '../../services/Report.service';
import { Campaign } from '../../models/campaign.model';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {
  reportForm: FormGroup;
  campaigns:Campaign[];

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
    this.reportservice.getCampaignsbydate(this.fromDate.value, this.toDate.value).subscribe((res) => {
      console.log(res);

      this.campaigns= res as Campaign[];
      //console.log(res);
      this.generatePdf();
    });
  }

   generatePdf(){


    var rows = [];
rows.push(['Name', 'Description', 'Owner','Target', 'Deadline', 'Category']);

for(var i of this.campaigns) {
    rows.push([i.name, i.description, [i.owner.name + ' ' + i.owner.email],i.target, i.deadline.toString(), i.category]);
}




var docDefinition = {
    content: [


     {text:'Campaigns Report',fontSize: 20,bold:true,margin: [ 5, 2, 10, 20 ]},

     {text:'From '+this.fromDate.value+'To '+this.toDate.value,fontSize: 15 ,bold: true,margin: [ 5, 2, 10, 20 ]},


        {table: {

               // widths: ['*', 100, 200, '*', '*', '*'],
                body: rows
            }}
    ]

}
   // pdfMake.createPdf(docDefinition).download();



}

}


