import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { AiAssistance } from '../../_models/aiassisstance';
import { AiPromptType } from '../../_models/aiPromtType';
import { AiService } from '../../_services/ai.service';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../_services/members.service';

@Component({
  standalone: true,
  selector: 'app-ai-assisatnce',
  imports: [CommonModule],
  templateUrl: './ai-assisatnce.component.html',
  styleUrls: ['./ai-assisatnce.component.css']
})
export class AiAssisatnceComponent {
  @Input() currentMessage: string;
  @Input() conversationHistory: any[] = [];
  @Input() userName: string = '';
  @Output() aiResponseGenerated = new EventEmitter<string>();
  userContext: string = 'Preferred tone: playful. Interests: technology, gaming, music.';
  selectedPromptType: AiPromptType = 'Chat';
  isBubbleOpen = false;
  isDropdownOpen = false;
  isLoading = false;
  aiResponse: string | null = null;

  constructor(private aiService: AiService, private memberService: MembersService, private cdr: ChangeDetectorRef) { }


  toggleAiAssistance() {
     this.isBubbleOpen = !this.isBubbleOpen;

  if (this.isBubbleOpen) {
    this.getUserContext();
  }
  }
  toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}


  selectAiMode(mode: AiPromptType) {
  this.selectedPromptType = mode;
  this.isDropdownOpen = false;
  this.isBubbleOpen = true;
  this.getAiHelp();
}
  

  getAiHelp(): void {
  if (!this.currentMessage?.trim()) return;

  this.isLoading = true;
  this.aiResponse = null;

  const request: AiAssistance = {
    userMessage: this.currentMessage,
    conversationContext: this.getConversationContext(),
    userContext: this.userContext,
    promtType: this.selectedPromptType
  };
//response.response ne dostavlja u ai bubble odgovor od ai, i ako je odgovor tu u response. treba samo napraviti da se response dodeli u buble nakon sto se funkcija odradi
  this.aiService.getAiAssisatnce(request).subscribe({
    next: (response) => {
      this.aiResponse = response.response;
      this.isLoading = false;
      console.log('AI assistance response:', response);
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error fetching AI assistance:', error);
      this.isLoading = false;
    }
  });
}

  useAiResponse() {
    this.aiResponseGenerated.emit(this.aiResponse);
    this.isDropdownOpen = false;
    this.isBubbleOpen = false;
    this.aiResponse = '';
  }

  getUserContext() {
    const member = this.memberService.getMember(this.userName);
    member.subscribe({
      next: (user) => {
        this.userContext = `Preferred tone: playful. About me: ${user?.about || 'not specified'}.`;
        console.log('User context set to:', this.userContext);
      },
      error: (error) => {
        console.error('Error fetching user context:', error);
      }
    });
  }


  //uzmi is member servica userContect ili about user i to ubaci ovde umesto userContext


  getConversationContext(): string {
    return this.conversationHistory.map(msg => `${msg.senderUsername}: ${msg.content}`).join('\n');
  }
}
