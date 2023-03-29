import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isError=false;

  constructor(private passService:PasswordManagerService,private route:Router){}

  onSubmit(f:any){

    this.passService
      .login(f.value.Email, f.value.Password)
      .then(() => {
        this.route.navigate(['/sites'])
      })
      .catch((err) => {
        this.isError = true;
      });

  }
}
