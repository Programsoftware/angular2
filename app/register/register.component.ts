import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
      email: '',
      password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router){     

  }

  ngOnInit() {
  }

  tryRegister(){
    this.authService.doRegister(this.user.email, this.user.password)
    .then(res => {
      window.alert(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['profile']);
    }, err => {
      window.alert(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }


}
