import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendAlerts(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-alerts`, { data });
  }

  getWaterLevel(): Observable<{ level: number, isCritical: boolean }> {
    return interval(2000).pipe(  // Emitir valores cada 2 segundos
      map(() => {
        const level = Math.floor(Math.random() * 150);  // Generar nivel de agua aleatorio entre 0 y 150
        return { level, isCritical: level > 100 };
      })
    );
  }
}
