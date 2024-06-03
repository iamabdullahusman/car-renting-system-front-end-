import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../../Cars';
import { StorageService } from '../../../services/storage/storage.service';

const BASIC_URL = 'https://localhost:7171';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // private baseUrl = 'https://localhost:7171/api/Admin'; 

  constructor(private http: HttpClient) { }

  postCar(carDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/car", carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAlCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/cars", {
      headers: this.createAuthorizationHeader()
    });
  }




  getBookings():Observable<any>   // get all bookings
  {
    return this.http.get(BASIC_URL + "/api/GetBookings/bookings",{
      headers: this.createAuthorizationHeader()
    })
  }
  changeStatus(bookingId:number, status:string)       // approve or rejected
  {
    console.log(bookingId,status); 
    return this.http.put(BASIC_URL + `/api/Getbookings/${bookingId}/${status}`,{
      headers: this.createAuthorizationHeader()
    })

  }



  deleteCar(carId: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/admin/car/" + carId, {
      headers: this.createAuthorizationHeader()
    });
  }
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set
      (
        'Authorization',
        'Bearer ' + StorageService.getToken()
      )
  }
}


