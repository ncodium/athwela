import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { User} from '../../models/user.model';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss'],
  providers: [UserService]
})
export class AdminModeratorsComponent implements OnInit {
  modalRef: BsModalRef;
  Users: User[];

  constructor(private modalService: BsModalService,
    private userservice: UserService) { 
     
  }
  ngOnInit() { 
    this.getmods();
  }
  getmods() {
    this.userservice.getmoderators().subscribe((res) => {
      this.Users = res['users'] as User[];
      
    });
  }

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3, r: 20 },
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];
  
  public scatterChartType: ChartType = 'scatter';

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
