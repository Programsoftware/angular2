import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import '@firebase/database';
import { Agent } from 'http';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private email='';

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            this.email = this.userDetails.email;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
  }  
  

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  doRegister(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }


  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }


  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/home']));
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


   
   
   
   getInfo(id, callback){
     
    firebase.database().ref("users/"+this.encodeAsFirebaseKey(this.email)+'/'+id).once('value', function(snapshot){
      var peep = snapshot;
      callback(null, peep);
    }, function (error) {
      // error wil be an Object
      callback(error)
    });
    
    
    
   }

  // getLastNameInfo() : string{  
  //   firebase.database().ref("users/"+this.encodeAsFirebaseKey(this.email)).once('value').then(function(snapshot) {
  //     console.log(snapshot.val().lastname);
  //     var lastname=snapshot.val().lastname;
  //     return lastname;
  //   })
  //   return lastname;
  // }

  // getEmailInfo() : string{  
  //   firebase.database().ref("users/"+this.encodeAsFirebaseKey(this.email)).once('value').then(function(snapshot) {
  //     console.log(snapshot.val().email);
  //     var Email=snapshot.val().email;
  //     return Email;
  //   })
  // }

  // getAgeInfo(): string{  
  //   firebase.database().ref("users/"+this.encodeAsFirebaseKey(this.email)).once('value').then(function(snapshot) {
  //     console.log(snapshot.val().age);
  //     var age=snapshot.val().age;
  //     return age; 
  //   })
  // }

}