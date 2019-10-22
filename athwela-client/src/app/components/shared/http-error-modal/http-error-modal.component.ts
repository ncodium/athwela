import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      We are sorry, but your request couldn't be handled at the moment.
      <div [innerHTML]="text" class="alert alert-danger mt-4">

      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})
export class HttpErrorModalComponent implements OnInit {
  title: string;
  text: string;

  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit() { }
}