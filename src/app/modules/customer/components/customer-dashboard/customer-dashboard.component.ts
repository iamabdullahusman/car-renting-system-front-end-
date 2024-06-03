import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit{
  cars: any = [];
  constructor(private customerService: CustomerService, private message: NzMessageService) { }
  ngOnInit(): void {
    this.getAllCars();

  }
  getAllCars() {
    this.customerService.getAlCars().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: { processingImg: string; returnedImage: string; }) => {      //////////
        element.processingImg = 'data.image/jpeg;base64' + element.returnedImage;
        this.cars.push(element);

      });
    })
  }
}
