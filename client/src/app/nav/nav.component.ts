import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


@Component({
  selector: 'app-nav',
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
  ],
  providers: [
    AccountService,

  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any = {}
  
  
  constructor(public accountService: AccountService) { }


  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  logout() {
    this.accountService.logout();
  }


}
