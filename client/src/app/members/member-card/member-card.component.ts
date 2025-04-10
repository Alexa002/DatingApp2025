import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { Router, RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { PresenceService } from '../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  imports: [CommonModule,RouterModule,ToastrModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  
  constructor(private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService) {  }
  
  ngOnInit(): void {
   
  }

  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success("You have liked " + member.knownAs);
    })
  }



}
