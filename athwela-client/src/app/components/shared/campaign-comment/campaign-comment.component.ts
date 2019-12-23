import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-comment',
  templateUrl: './campaign-comment.component.html',
  styleUrls: ['./campaign-comment.component.scss']
})
export class CampaignCommentComponent implements OnInit {
  @Input() comments: any;

  constructor() { }

  ngOnInit() {
  }

}
