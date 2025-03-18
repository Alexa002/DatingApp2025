import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../_modules/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-managment',
  imports: [CommonModule, NgFor, ModalModule,],
  providers: [BsModalService],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.css'
})
export class UserManagmentComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }

  private getRolesArray(user){
    const roles: string[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', Value:'Admin'},
      {name: 'Moderator', Value:'Moderator'},
      {name: 'Member', Value:'Member'}
    ];


    availableRoles.forEach(role => {
      let isMatch = false;
      for(const userRole of userRoles) {
         if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
         }
      }
      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
}


