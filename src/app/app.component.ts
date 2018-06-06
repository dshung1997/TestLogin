import { Component, OnInit } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import {  GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
    if(window.localStorage.getItem('user'))
    {
      let jsonUser = window.localStorage.getItem('user');
      if(jsonUser !== 'undefined')
      {
        this.user = JSON.parse(jsonUser);
      }
    }
  }
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( data => {
      // console.log("data: ", data);
      this.user = data;
      this.saveLocal();
    });
  }
 
  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( data => {
      // console.log("data: ", data);
      this.user = data;
      this.saveLocal();
    });
  }
 
  signOut(): void {
    this.authService.signOut();
    window.localStorage.clear();
    this.user = null;
  }

  saveLocal(): void {
    window.localStorage.clear();
    localStorage.setItem("user", JSON.stringify(this.user));
  }
}