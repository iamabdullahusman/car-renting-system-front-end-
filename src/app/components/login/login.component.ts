import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 
  isSpining: boolean = false;
  loginform!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private message:NzMessageService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }
  login()
  {
    console.log(this.loginform.value);
    this.authService.login(this.loginform.value).subscribe((res)=>{
      console.log(res);
      if(res.token){debugger
        const user = {
          id: res.user.userId,
          user: res.user,
          role:res.user.role 

        }
        StorageService.saveToken(user.role);
        StorageService.saveUser(user);
        if(StorageService.isAdminLoggedIn())
          this.router.navigateByUrl("/admin/dashboard");
        else 
        this.router.navigateByUrl("/customer/dashboard");
      }else{
         this.message.error("Bad Credtionals",{nzDuration:5000})
      }
    })
  }
}
