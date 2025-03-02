import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { TimeagoClock, TimeagoModule,  } from "ngx-timeago";
import { BrowserModule } from '@angular/platform-browser';
import { MemberMessagesComponent } from "../../messages/member-messages/member-messages.component";
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';

@Component({
  selector: 'app-member-detail',
  imports: [CommonModule, TabsModule, NgxGalleryModule, HttpClientModule, TimeagoModule, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  @ViewChild('memberTabs', {static: true})  memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];

  
  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }



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



loadMessages(){
  this.messageService.getMessageThread(this.member.username).subscribe(messages => {
    this.messages = messages;
  })
}

onTabActivated(data: TabDirective){
  this.activeTab = data;
  if(this.activeTab.heading === "Messages" && this.messages.length === 0) {
    this.loadMessages();
  }
}

selectTab(tabId: number){
  this.memberTabs.tabs[tabId].active = true;
}

}
