import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';



const BASIC_URL =  'https://localhost:7171'; 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient , private auth:AuthService) { }
  getAlCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars", {
      headers: this.createAuthorizationHeader()
    });
  }
  getCarById(carId:number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/"+ carId, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  bookACar(carId:number , booking:any): Observable<any> {
    console.log(booking);
    const userId = StorageService.getUserById();
    console.log("User Id",userId);
    booking['userId'] = userId;
    return this.http.post(`${BASIC_URL}/api/customer/car/book/${carId}`, booking, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + "/api/GetBookings/bookings/" + userId, {
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
