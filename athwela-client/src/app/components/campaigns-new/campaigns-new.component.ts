import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})
export class NewCampaignComponent implements OnInit {
  categories: string[] = ["medical", "education"]

  name: string;
  description: string;
  target: number;
  deadline: Date;
  category: string;
  id: string;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private http: HttpClientModule
  ) { }

  ngOnInit() {
  }

  onCreateCampaign() {
    const campaign = {
      name: this.name,
      description: this.description,
      target: this.target,
      deadline: this.deadline,
      raised: 0,
      category: this.category
    }

    // register User
    this.campaignService.createCampaign(campaign).subscribe(data => {
      if (data) {
        console.log(data);
        this.router.navigate([`/campaign/${data}`]);
      } else {
        console.log("error");
      }
    });
  }
}
