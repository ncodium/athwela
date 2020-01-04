import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { TabsetComponent } from 'ngx-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { AppConfig } from 'src/app/config/app-config';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})

export class NewCampaignComponent implements OnInit {
  campaignForm: FormGroup;
  submitted = false;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  id: string;
  categories: string[] = ["medical", "education"]

  uploader: FileUploader;
  response: any;
  avatar: string;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private http: HttpClientModule,
    private fb: FormBuilder
  ) {
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo',
      maxFileSize: 5 * 1024 * 1024,
      allowedMimeType: ['image/png', 'image/jpeg']
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploades successfully!');
      this.avatar = AppConfig.BASE_URL + this.response.path;
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG of JPEG formats with size less than 5MB');
    }

    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      target: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      category: ['', Validators.required],
      raised: ['']
    });
  }

  //convenience getter for easy access to form fields
  get f() { return this.campaignForm.controls; }

  onCreateCampaign(): void {
    this.submitted = true;
    if (this.campaignForm.invalid) { return; }

    const campaign = {
      name: this.campaignForm.controls.name.value,
      description: this.campaignForm.controls.description.value,
      target: this.campaignForm.controls.target.value,
      deadline: this.campaignForm.controls.deadline.value,
      category: this.campaignForm.controls.category.value,
      raised: 0,
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

  getActiveTab() {
    const activeTab = this.staticTabs.tabs.filter(tab => tab.active);
    return(activeTab);
  }

  // previousTab() {

  // }

  // nextTab() {
  //   const acTab = this.getActiveTab();
  //   this.staticTabs.tabs[].active = true;
  //   console.log(this.staticTabs[].active);
  // }
}
