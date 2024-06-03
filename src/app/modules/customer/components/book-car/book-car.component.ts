import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../services/storage/storage.service';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {
  car: any;
  carId: number = this.activated.snapshot.params["id"];
  bookACarForm!: FormGroup;
  isSpinning = false;
  bookingData: any = {};
  status: string ='';
  amount: number= 0;


  dateFormat = 'yyyy-MM-dd';


  constructor(private customerService: CustomerService,
    private message: NzMessageService,
    private activated: ActivatedRoute,
    private fb: FormBuilder, private notification: NzNotificationService) {
    this.carId = 1;
    this.bookACarForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    })
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      //////////
      res.processingImg = 'data.image/jpeg;base64' + res.returnedImage;
      this.car = res;

    });
  }
  bookCar(formData: any): void {
    const diff = Math.abs(formData.toDate.getTime() - formData.fromDate.getTime());
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    console.log(days);
    // Define price per day
    const pricePerDay = 100; 
    // Calculate the amount
    const amount = pricePerDay * days;
    this.isSpinning = true;
    const userId = StorageService.getUserById();
    const bookingData = {
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      days : days,
      userId: StorageService.getUserById(),
      amount: amount,
      // userId: userId,
      status: "PENDING",
      //Amount: 100,
     
    };
    console.log("Date",formData);
    console.log(bookingData);
    this.customerService.bookACar(this.carId, bookingData)
      .subscribe(response => {
        this.notification.create(
          'success', 'Booked', 'Your car has been booked'
        );
        this.isSpinning = false;
        console.log('Booking successful:', response);
        // Handle success
      }, error => {
        this.isSpinning = false;
        console.error('Booking failed:', error);
        this.notification.create(
          'error', 'Not Booked', 'Your car has been Cancelled'
        );
        // Handle error
      });



  }

}
