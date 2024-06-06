import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CommonModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    AlertsComponent,
    RouterModule.forRoot(routes),
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
