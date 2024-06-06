import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NgFor, NgIf, NgClass],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  waterLevels: { time: string, level: number, isCritical: boolean }[] = [];

  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataService.getWaterLevel().subscribe(data => {
      const currentTime = new Date().toLocaleTimeString();
      this.waterLevels.push({ ...data, time: currentTime });

      // Enviar alerta si el nivel es crítico
      if (data.isCritical) {
        this.dataService.sendAlerts(` ${data.level} cm`).subscribe(response => {
          console.log('Alert sent:', response);
        }, error => {
          console.error('Error sending alert:', error);
        });
      }

      if (this.waterLevels.length > 100) {
        this.waterLevels.shift(); // Mantener solo los últimos 10 registros
      }
    });
  }

  sendAlerts(): void {
    this.dataService.sendAlerts('alert').subscribe((data: any) => {
      console.log(data);
    });
  }

}
