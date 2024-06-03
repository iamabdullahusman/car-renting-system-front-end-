import { Component } from '@angular/core';
import { StorageService } from '../../../../services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import {  NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  isSpinning = false;
  bookedCars: any[] = [];
  constructor(private service: AdminService,
    private message: NzMessageService
  ) {
    this.getBookings();
  }
  getBookings() {
    this.isSpinning = true;
    const userId = parseInt(StorageService.getUserById(), 10);
    console.log(userId);

    this.service.getBookings().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bookedCars = res;
    })

  }
  changeBookingStatus(bookingId: number, status: string) {
    console.log(bookingId, status);
    this.isSpinning = true;
    this.service.changeStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      this.getBookings();
      this.message.success("Status Changed Successfully", { nzDuration: 5000 })
    }, error => {

      this.message.error("Something went Wrong", { nzDuration: 5000 });

    }
    );
  }
}
