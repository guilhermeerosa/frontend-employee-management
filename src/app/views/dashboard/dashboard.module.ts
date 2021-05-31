import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [
  ],
  providers: [],
})
export class DashboardModule { }
