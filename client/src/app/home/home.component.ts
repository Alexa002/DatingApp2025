import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerMode = false;
  userExists: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  checkUsers() {
    const user : User = JSON.parse(localStorage.getItem('user'));
    if(user)
      this.userExists = true;
    else
      this.userExists = false; 
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
