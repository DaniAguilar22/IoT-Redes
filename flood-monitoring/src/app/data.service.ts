import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendAlerts(data: string){
    return this.http.post(`${this.apiUrl}/send-alerts`, { sensorData: data })
    .pipe(
      catchError(error => {
        console.error('Error sending alerts:', error);
        throw error;
      })
    );
  }
}
