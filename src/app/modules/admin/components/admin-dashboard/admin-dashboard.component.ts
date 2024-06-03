import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Car } from '../../../../Cars';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  cars: any = [];
  constructor(private adminService: AdminService, private message: NzMessageService) { }
  ngOnInit(): void {
    this.getAllCars();

  }
  getAllCars() {
    this.adminService.getAlCars().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: { processingImg: string; returnedImage: string; }) => {      //////////
        element.processingImg = 'data.image/jpeg;base64' + element.returnedImage;
        this.cars.push(element);

      });
    })
  }
  deleteCar(id: number): void {

    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
      this.getAllCars();
    },

    );
  }
}
