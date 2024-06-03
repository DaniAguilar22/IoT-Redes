import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
