import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};


  constructor(private accountService: AccountService, private toastr: ToastrService) {


  }

  ngOnInit(): void {

  }

  register() {
   this.accountService.register(this.model).subscribe(respnse => {
    console.log(respnse);
    this.cancel();
   },error =>{
    console.log(error);
    this.toastr.error(error.error);
   }
  )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}

