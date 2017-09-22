import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AlertService } from '../shared/alert.service';

@Injectable()

export class AuthService {
  database = firebase.database();
  token: string;
  username: string;
  userEmail: string;
  userStars: string[] = [];

  constructor(private router: Router,
    private alertService: AlertService) {

  }

  // checkUsername(username:string) {
  //   return this.database.ref('/users/' + username).once('value')
  //     .then( (data) => {
  //       if (!data.val()) {
  //         console.log("username available");
  //         return true;
  //       }
  //       else {
  //         console.log("username unavailable");
  //         return false;
  //       }
  //   })
  // }

  signupUser(username: string, email: string, password: string) {
    // console.log(this.checkUsername(username));
    // if(this.checkUsername(username)){
    //  console.log("registering user");
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
                () => { 
                  this.username = username;
                  this.userEmail = email;
                  this.getStars();
                  this.alertService.successAlert("Signup Successful.")
                }
              )
              .catch(
                error => this.alertService.errorAlert(error.message)
               );
          }
        )
        .catch(
          error => this.alertService.errorAlert(error.message)
        )
    //}
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.alertService.successAlert("Login Successful");
          this.router.navigate(['/legends']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
          );
          const userData = firebase.auth().currentUser;
          this.username = userData.displayName;
          this.userEmail = userData.email;
          this.getStars();
        }
      )
      .catch(
        error => this.alertService.errorAlert(error.message)
      );
  }

  changePassword (currentPassword: string, newPassword: string)  {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.userEmail,
      currentPassword
    );
    firebase.auth().currentUser.reauthenticateWithCredential(credential)
      .then( () => {
        firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => {this.alertService.successAlert("Password successfully updated.")})
        .catch((error) => {this.alertService.errorAlert(error.message)})
      })
      .catch( (error) => {this.alertService.errorAlert(error.message)});
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getStars() {
    if(!this.username){
      return null;
    }
    this.database.ref('/users/' + this.username + '/starred').once('value')
      .then( (stars) => {
        if(!stars.val()) {
          return
        }
        else {
          stars.forEach((returnedStar) => {
            this.userStars.push(returnedStar.val());
          })
        }
      })
  }

  isAuthenticated() {
    return this.token != null;
  }

  deleteUser(){
    
  }

  logout() {
    firebase.auth().signOut()
      .then(
        () => this.alertService.successAlert("Logout Successful")
      )
      .catch(
        error => this.alertService.errorAlert(error.message)
      );
    this.token = null;
    this.username = null;
    this.userStars = [];
    if (this.router.url == "/user") {
      this.router.navigate(['/legends']);
      this.alertService.errorAlert("Rerouted: Must be authenticated for User Settings.")
    }
  }
}