import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};


  constructor(private accountService: AccountService) {


  }

  ngOnInit(): void {

  }

  register() {
   this.accountService.register(this.model).subscribe(respnse => {
    console.log(respnse);
    this.cancel();
   },error =>{
    console.log(error);
   }
  )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}

