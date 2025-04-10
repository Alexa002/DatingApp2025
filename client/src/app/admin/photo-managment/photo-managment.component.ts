import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AdminService } from '../../_services/admin.service';
import { Member } from '../../_models/member';
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';
import { User } from '../../_models/user';
import { PhotoModalComponent } from '../../_modules/photo-modal/photo-modal/photo-modal.component';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-photo-managment',
  imports: [CommonModule, NgFor, ModalModule],
  providers: [BsModalService],
  templateUrl: './photo-managment.component.html',
  styleUrls: ['./photo-managment.component.css'],
})
export class PhotoManagementComponent implements OnInit {
  users: Partial<User[]>
  bsModalRef: BsModalRef;

  constructor(private memberService: MembersService, private toaster: ToastrService
    , private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithPhotos();
   

  }

  getUsersWithPhotos() {
    this.adminService.getPhotosForModeration().subscribe(users => {
      this.users = users;
    })
  }

  openPhotosModal(user: User) {
    const photoIds = this.getPhotoIds(user);
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        photoIds: photoIds
      }
    };
    this.bsModalRef = this.modalService.show(PhotoModalComponent, config);

    this.bsModalRef.content.updatedPhotos.subscribe(values => {
      console.log(values)
      const photosToUpdate = {
        photos: values,
      };
      
      console.log(photosToUpdate)
      if (photosToUpdate.photos.length > 0) {
        photosToUpdate.photos.forEach((photoId: number) => {
         this.adminService.deletePhotoAsAdmin(photoId, user.username).subscribe(() => {
            this.toaster.info(`Photo with ID ${photoId} deleted successfully.`);
            this.getUsersWithPhotos();
          },
            (error) => {
              this.toaster.error(`Error deleting photo with ID ${photoId}:`);
            }
          );
        })
      } else {
        this.toaster.info("No photos selected for delition. ");
      }
    });
  }

 private getPhotoIds(user) {
  const photoIds: number[] = [];
  const member = this.memberService.getMember(user.username).subscribe((member: Member) => {
    if(member && member.photos) {
      for(const photo of member.photos) {
        photoIds.push(photo.id);
        console.log(photoIds)
      }
    }
  });
  
  return photoIds;

 }
}
