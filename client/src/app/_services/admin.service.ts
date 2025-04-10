import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  getUserWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(userName: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + userName + '?roles=' + roles, {});
  }

  getPhotosForModeration() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/photos-to-moderate');
  }

  deletePhotoAsAdmin(photoId: number, userName: string) {
    return this.http.delete(this.baseUrl + 'admin/photo-delete/' + userName + '/' + photoId);
  }
}
