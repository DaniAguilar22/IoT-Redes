import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendAlerts(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-alerts`, { data });
  }

  getWaterLevel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getData`);
  }

  getPeriodicUpdates(intervalMs: number): Observable<any[]> {
    return interval(intervalMs).pipe(
      switchMap(() => this.getWaterLevel())
    );
  }
}
