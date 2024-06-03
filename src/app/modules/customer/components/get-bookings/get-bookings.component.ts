import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../services/storage/storage.service';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  isSpinning=false;
  bookedCars:any[] = [];
constructor(private service: CustomerService){
  this.getBookings();
}
getBookings()
{
  this.isSpinning=true;
  const userId = parseInt(StorageService.getUserById(),10); 
  console.log(userId);
  
  this.service.getBookingsByUserId(userId).subscribe((res)=>{
    this.isSpinning=false;
    console.log(res);
    this.bookedCars = res;
  })

}
}
