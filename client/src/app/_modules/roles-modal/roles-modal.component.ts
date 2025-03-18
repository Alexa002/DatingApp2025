import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from '../../_models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-modal',
  imports: [CommonModule, ModalModule, FormsModule],
  providers: [BsModalService],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter()
  user: User;
  roles: any[];


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }


}
