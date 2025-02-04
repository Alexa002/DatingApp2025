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

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterModule, CommonModule, NavComponent,NgxSpinnerModule],
  providers:[ 
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Kupi Auto';
  users: any

  constructor(private accountService: AccountService) { }


  ngOnInit() {
    this.setCurrentUser(); 
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
   }

 
}


