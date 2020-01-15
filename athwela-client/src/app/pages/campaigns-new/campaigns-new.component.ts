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
import { resolve } from 'url';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})

export class NewCampaignComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  campaignForm: FormGroup;
  submitted = false;

  uploader: FileUploader;
  dropZone: boolean;
  response: string;

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
      url: AppConfig.BASE_URL + 'upload/all',
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.name,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.dropZone = false;
    this.response = '';

    this.uploader.response.subscribe(res => {
      this.response = res;
      console.log(res);
    });
  }

  public fileOverDropZone(e: any): void {
    this.dropZone = e;
  }

  ngOnInit() {
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
