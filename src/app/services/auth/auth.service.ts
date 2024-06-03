import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ["https://localhost:7171"];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(signupRequest:any): Observable<any>
  {
    return  this.http.post(BASIC_URL  + "/api/auth/signup", signupRequest);
  }
  login(loginRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "/api/auth/login", loginRequest);
  }
}
