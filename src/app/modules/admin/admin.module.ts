import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroModule } from '../../NgZorroModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    GetBookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule
  ]
})
export class AdminModule { }
