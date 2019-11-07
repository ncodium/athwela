import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})

export class NewCampaignComponent implements OnInit {
  id: string;
  categories: string[] = ["medical", "education"]

  campaignForm: FormGroup;
  submitted = false;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private http: HttpClientModule,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      category: ['', Validators.required],
      raised: [''],
    });
  }

  get f() { return this.campaignForm.controls; }

  onCreateCampaign(): void {
    this.submitted = true;

    if(this.campaignForm.invalid) { return; }
    
    const campaign = {
      name: this.campaignForm.controls.name.value,
      description: this.campaignForm.controls.description.value,
      target: this.campaignForm.controls.target.value,
      deadline: this.campaignForm.controls.deadline.value,
      raised: 0,
      category: this.campaignForm.controls.category.value
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
