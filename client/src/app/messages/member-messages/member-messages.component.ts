import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, NgForm } from '@angular/forms';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-messages',
  imports: [CommonModule,TimeagoModule, ButtonsModule,FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit{
  @ViewChild('messaageForm') messageForm: NgForm;
  @Input() messages: Message[] = [];
  @Input() username: string;
  messageContent: string;
  

  constructor(private messageService: MessageService){}


  ngOnInit(): void {
    
  }

 
  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
    })
  }

}
