import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-campaign-comments',
  templateUrl: './campaign-comments.component.html',
  styleUrls: ['./campaign-comments.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignCommentsComponent implements OnInit {
  body: String;
  submitted = false;

  @Input() comments: any;
  @Input() loggedIn: boolean;
  @Input() user: any;

  @Output() comment = new EventEmitter<String>();
  @Output() delete = new EventEmitter<String>();

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    this.comment.emit(this.body);
    this.submitted = true;
    this.body = '';
  }

  onDelete(id: String) {
    this.delete.emit(id);
  }

}
