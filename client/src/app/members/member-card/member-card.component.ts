import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  
  constructor() {  }
  
  ngOnInit(): void {
   
  }



}
