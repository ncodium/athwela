import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campaign-comment',
  templateUrl: './campaign-comment.component.html',
  styleUrls: ['./campaign-comment.component.scss']
})
export class CampaignCommentComponent implements OnInit {
  body: String;
  submitted = false;
  @Input() comments: any;
  @Input() loggedIn: boolean = false;
  @Input() loading: boolean = true;
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
