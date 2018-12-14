import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import '@firebase/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  firstname="default";
  lastname='';
  age='';
  email

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            this.email = this.userDetails.email;
            console.log(this.userDetails);
            window.alert(this.email);
            window.alert(this.firstname);
            firebase.database().ref("users/"+this.encodeAsFirebaseKey(this.email)).once('value').then(function(snapshot) {
              var firstname = snapshot.val().firstname;
              console.log(firstname);
            });
            window.alert(this.firstname);
          } else {
            this.userDetails = null;
          }
        }
      );
  }  
  



  ngOnInit() {
    
      
          // if(this.authService.isLoggedIn()){       
          //   window.alert('hi');
          //   this.firstname=this.authService.getInfo();
          //   console.log(this.firstname);
          //   this.lastname=this.authService.getInfo();
          //   console.log(this.lastname);
          //   this.age=this.authService.getInfo();
          //   console.log(this.age);
          //   this.email=this.authService.getInfo();
          //   console.log(this.email);
          //   }else{     
          //     this.router.navigate(['home']);
          //   }
          
    
  }
  
  encodeAsFirebaseKey(string) {
    return string.replace(/\%/g, '%25')
      .replace(/\./g, '%2E')
      .replace(/\#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/\//g, '%2F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  };

  // logout(){
  //   this.authService.logout();
  // }
  getfirstname(){
  
}
}