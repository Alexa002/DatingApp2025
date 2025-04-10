import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from "./nav/nav.component";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, NavComponent, NgxSpinnerModule],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: User

  constructor(private accountService: AccountService, private presence: PresenceService) { }


  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
      
    }
  }


}


