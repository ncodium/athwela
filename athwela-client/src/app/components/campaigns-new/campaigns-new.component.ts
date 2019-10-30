import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl } from '@angular/forms'; 
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})
export class NewCampaignComponent implements OnInit {
  id: string;
  categories: string[] = ["medical", "education"]

  name = new FormControl('');
  description = new FormControl('');
  target = new FormControl('');
  deadline = new FormControl('');
  category = new FormControl('');

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private http: HttpClientModule
  ) { }

  ngOnInit() {
  }

  onCreateCampaign() {
    const campaign = {
      name: this.name.value,
      description: this.description.value,
      target: this.target.value,
      deadline: this.deadline.value,
      raised: 0,
      category: this.category.value
    }

    // register User
    this.campaignService.createCampaign(campaign).subscribe(data => {
      if (data['success']) {
        const campaignId: string = data['campaign']['_id'];
        this.router.navigate([`/campaign/${campaignId}`]);
      } else {
        // show error
      }
    });
  }
}
