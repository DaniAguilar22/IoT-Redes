import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  sendAlerts(): void {
    this.dataService.sendAlerts('alert').subscribe((data: any) => {
      console.log(data);
    });
  }

}
