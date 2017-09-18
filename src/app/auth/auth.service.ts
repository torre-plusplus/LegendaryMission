import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  token: string;
  username: string;
  userEmail: string;

  constructor(private router: Router) {

  }

  signupUser(username: string, email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/legends']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          firebase.auth().currentUser.updateProfile(
            {displayName: username, photoURL: null}
          )
            .then(
              () => { this.username = username }
            )
            .catch(
              error => console.log(error)
             );
        }
      )
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/legends']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
          );
          const userData = firebase.auth().currentUser;
          this.username = userData.displayName;
          this.userEmail = userData.email;
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  deleteUser(){
    
  }

  logout() {
    firebase.auth().signOut()
      .catch(
        error => console.log(error)
      );
    this.token = null;
    this.username = null;
  }
}