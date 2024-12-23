import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Kupi Auto';
  users: any

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.getUsers();
    
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/api/users')
    .subscribe( users => {
      this.users = users  
    },
    error => {
      console.log(error)
    }
  )};

}


