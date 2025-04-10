import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { User } from '../../../_models/user';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-modal',
  imports: [CommonModule, ModalModule, FormsModule],
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css'], 
})
export class PhotoModalComponent implements OnInit
{
  @Input() updatedPhotos = new EventEmitter<number[]>();
  @Input() user: User;
  @Input() photoIds: number[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  photoChecked: { [id: number]: boolean } = {}; 

  ngOnInit(): void {
    this.photoIds.forEach((id) => {
      this.photoChecked[id] = false; 
    });
    console.log('Initialized photoChecked:', this.photoChecked);
  }

  updatePhotos(): void {
    const selectedPhotoIds = this.photoIds.filter((id) => this.photoChecked[id]);
    console.log('Selected Photo IDs:', selectedPhotoIds);
    this.updatedPhotos.emit(selectedPhotoIds);
    this.bsModalRef.hide();
  }
}
