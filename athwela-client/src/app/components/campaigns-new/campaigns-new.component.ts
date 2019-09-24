import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})
export class NewCampaignComponent implements OnInit {
  name: String;
  description: String;
  target: Number;
  
  constructor() { }

  ngOnInit() {
  }

  onCreateCampaign() {
    console.log("lol");
  }

}
