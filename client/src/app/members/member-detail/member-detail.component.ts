import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { TimeagoClock, TimeagoModule,  } from "ngx-timeago";
import { BrowserModule } from '@angular/platform-browser';
import { MemberMessagesComponent } from "../../messages/member-messages/member-messages.component";
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { PresenceService } from '../../_services/presence.service';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  imports: [CommonModule, TabsModule, NgxGalleryModule, HttpClientModule, TimeagoModule, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit, OnDestroy{
  @ViewChild('memberTabs', {static: true})  memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];
  user: User;
  
  constructor(public presence: PresenceService, private accountService: AccountService, private route: ActivatedRoute, private messageService: MessageService,
    private router: Router, private memberService: MembersService
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member
    })

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0)
    })

    this.galleryOptions =[
      {
        width: '500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      }
    ]

    this.galleryImages = this.getImages();
 }

 getImages(): NgxGalleryImage[]{
  const imageUrls = [];
  for(const photo of this.member.photos)
  {
    imageUrls.push({
      small: photo?.url,
      medium:photo?.url,
      big:photo?.url
    })
  }
  return imageUrls;
 }

 addLike(member: Member){
  this.memberService.addLike(member.username).subscribe(() => console.log(member.username));
 }



loadMessages(){
  this.messageService.getMessageThread(this.member.username).subscribe(messages => {
    this.messages = messages;
  })
}

onTabActivated(data: TabDirective){
  this.activeTab = data;
  if(this.activeTab.heading === "Messages" && this.messages.length === 0) {
    this.messageService.createHubConnection(this.user, this.member.username)
  } else {
    this.messageService.stopHubConnection();
  }
}

selectTab(tabId: number){
  this.memberTabs.tabs[tabId].active = true;
}

}
