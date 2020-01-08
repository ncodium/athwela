import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { AppConfig } from 'src/app/config/app-config';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})

export class NewCampaignComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  campaignForm: FormGroup;
  uploader: FileUploader;
  submitted = false;
  response: any;

  id: string;
  avatar: string;

  categories: string[] = ["medical", "education"]

  tabs: string[] = [
    'Tell you story',
    'How much are you raising?',
    'Add photos and videos',
    'Upload documents'
  ]
  currentTab: string = this.tabs[0];

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
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   this.response = JSON.parse(response);
    //   alert('File uploades successfully!');
    //   this.avatar = AppConfig.BASE_URL + this.response.path;
    // };
    // this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
    //   alert('You cannot upload this file!\nPlease choose a picture with PNG of JPEG formats with size less than 5MB');
    // }

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

  onSelect(data: TabDirective): void {
    this.currentTab = data.heading;
  }

  nextTab() {
    const currentTabIndex = this.staticTabs.tabs.findIndex(t => t.heading === this.currentTab);
    this.staticTabs.tabs[currentTabIndex + 1].active = true;
  }

  previousTab(tabId: number) {
    const currentTabIndex = this.staticTabs.tabs.findIndex(t => t.heading === this.currentTab);
    this.staticTabs.tabs[currentTabIndex - 1].active = true;
  }
}
