import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PhotoManagmentComponent } from '../photo-managment/photo-managment.component';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import { HasRoleDirective } from '../../_directives/has-role.directive';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, TabsModule, PhotoManagmentComponent,UserManagmentComponent, HasRoleDirective],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
