import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-campaigns-new',
  templateUrl: './campaigns-new.component.html',
  styleUrls: ['./campaigns-new.component.scss']
})

export class NewCampaignComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  AppConfig_BASE_URL: string = AppConfig.BASE_URL;
  campaignForm: FormGroup;
  submitted: boolean = false;
  previewImages: boolean = false;
  previewDocuments: boolean = false;
  imagesToUpload: Array<File> = [];
  documentsToUpload: Array<File> = [];

  id: string;

  tabs: string[] = [
    'Tell you story',
    'How much are you raising?',
    'Add photos and videos',
    'Upload documents'
  ]

  currentTab: string = this.tabs[0];

  categories: string[] = ["medical", "education"];

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private http: HttpClient,
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
      images: [''],
      documents: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.campaignForm.controls; }
  get images() { return this.campaignForm.get('images'); }
  get documents() { return this.campaignForm.get('documents'); }

  onCreateCampaign(): void {
    this.submitted = true;
    if (this.campaignForm.invalid) { return; }

    const campaign = {
      name: this.campaignForm.controls.name.value,
      description: this.campaignForm.controls.description.value,
      target: this.campaignForm.controls.target.value,
      deadline: this.campaignForm.controls.deadline.value,
      category: this.campaignForm.controls.category.value,
      images: this.campaignForm.controls.images.value,
      documents: this.campaignForm.controls.documents.value
    }

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

  uploadImages() {
    const formData: any = new FormData();
    const files: Array<File> = this.imagesToUpload;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i], files[i]['name']);
    }

    // console.log('form data variable : ' + formData.toString());

    this.http.post(AppConfig.BASE_URL + 'upload/images', formData).subscribe(
      files => {
        // console.log('files', files)
        // this.images.setValue(fileInput.target.files);
        // console.log(this.images.value);
        this.images.setValue(files);
        this.previewImages = true;
      }
    );
  }

  uploadDocuments() {
    const formData: any = new FormData();
    const files: Array<File> = this.documentsToUpload;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("documents", files[i], files[i]['name']);
    }

    // console.log('form data variable : ' + formData.toString());

    this.http.post(AppConfig.BASE_URL + 'upload/documents', formData).subscribe(
      files => {
        console.warn(files)
        // this.images.setValue(fileInput.target.files);
        // console.log(this.images.value);
        this.documents.setValue(files);
        this.previewDocuments = true;
      }
    );
  }

  imageChangeEvent(fileInput: any) {
    this.imagesToUpload = <Array<File>>fileInput.target.files;
    // this.images.setValue(fileInput.target.files);
  }

  documentChangeEvent(fileInput: any) {
    this.documentsToUpload = <Array<File>>fileInput.target.files;
    // this.images.setValue(fileInput.target.files);
  }
}
