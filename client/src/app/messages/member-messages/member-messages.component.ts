import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, NgForm } from '@angular/forms';
import { AiAssisatnceComponent } from '../ai-assisatnce/ai-assisatnce.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  imports: [CommonModule, TimeagoModule, ButtonsModule, FormsModule, AiAssisatnceComponent],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[] = [];
  @Input() userName: string;
  messageContent: string;

  showNewMeesagePanel: boolean = false;
  newMessageContent: string = '';

  constructor(public messageService: MessageService) { }



  sendMessage() {
    this.messageService.sendMessage(this.userName, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }
  
onAiResponseGenerated(aiResponse: string) {
  this.messageContent = aiResponse;
}

  toggleNewMessagePanel() {
    if (this.newMessageContent.trim()) {
      console.log('Sending message:', this.newMessageContent);
      this.messageService.sendMessage(this.userName, this.newMessageContent).then(() => {
        this.newMessageContent = '';
        this.showNewMeesagePanel = false;
      })
    }
  }

}
