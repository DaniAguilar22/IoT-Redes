import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NgFor, NgIf, NgClass],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  waterLevels: { time: string, level: number, isCritical: boolean }[] = [];
  private updateSubscription!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.updateSubscription = this.dataService.getPeriodicUpdates(1000) 
      .subscribe(records => {
        const newRecords = records.filter(record => 
          !this.waterLevels.some(existingRecord => existingRecord.time === record.timestamp)
        );
        
        newRecords.forEach(record => {
          this.waterLevels.push({ ...record, time: record.timestamp, isCritical: record.state === 'crítico' });

          if (record.state === 'crítico'){
            this.dataService.sendAlerts(` ${record.level} cm`).subscribe(response => {
              console.log('Alert sent:', response);
            }, error => {
              console.error('Error sending alert:', error);
            });
          }
        });

        // Limitar la cantidad de registros a los últimos 100
        if (this.waterLevels.length > 100) {
          this.waterLevels.splice(0, this.waterLevels.length - 100);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  sendAlerts(): void {
    this.dataService.sendAlerts('alert').subscribe((data: any) => {
      console.log(data);
    });
  }

}
