import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  imports: [CommonModule,RouterModule,FormsModule, TabsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm') editForm: NgForm;
member: Member;
user: User;
@HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
  if(this.editForm.dirty){
    $event.returnValue=true;
  }
}

constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{ this.user = user});
}



  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.userName).subscribe(member =>{
      this.member = member;
      console.log(this.user.userName);
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile updated succsefuly");
      this.editForm.reset(this.member);
    })
   
  }

}
