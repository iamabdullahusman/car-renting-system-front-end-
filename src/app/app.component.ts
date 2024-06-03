import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'carrentingsystem1';
  // isAdminLoggedIn: boolean = false;
  // isCustomerLoggedIn: boolean = false;

  constructor (private router: Router) {}


  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();


  // ngOnInit(): void {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
  //     this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
  //     console.log("Cutomer",this.isCustomerLoggedIn);
  //   });
  // }
  ngOnInit(): void {
     this.router.events.subscribe(event =>{
     if(event.constructor.name === "NavigationEnd"){
       this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
       this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
          console.log("Cutomer",this.isCustomerLoggedIn);
     }

     })
  }
  
  logout()
  {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
