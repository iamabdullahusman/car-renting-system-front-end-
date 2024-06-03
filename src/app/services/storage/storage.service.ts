import { Injectable } from '@angular/core';
import { RoleType } from '../../components/models/models';

const USER_KEY = "user";
const TOKEN_KEY = "token"; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  }

  static saveUser(user: any): void {
    console.log("This user",user);

    if (typeof window !== 'undefined') {
  
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  static getUser(): any {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(USER_KEY) || 'null');
    }
    return null;
  }
  
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }
  static getUserById():string
  {
   const user = this.getUser();
   console.log("user",user.user.id);
   if(user == null) {return '';}
   return user.user.id;


  }

  static getUserRole(): number {
    const user = this.getUser();
    return user ? user.role : "";
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && this.getUserRole() === RoleType.Admin;
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && this.getUserRole() === RoleType.Customer;
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }
}
