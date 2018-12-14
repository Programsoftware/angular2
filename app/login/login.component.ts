import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  user = {  
    email: '',
    password: ''
  };



  constructor(private authService: AuthService, private router: Router){     

  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
       .then((res) => {
        console.log(res);
    
          this.router.navigate(['profile']);
       })
       .catch((err) => window.alert('error: ' + err));
  }

  

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['profile']);
    }
  }

  
 
}
