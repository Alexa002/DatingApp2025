import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]' //*appHasRole='[]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;


  constructor(private viewContainerRef: ViewContainerRef, private templatesRef: TemplateRef<any>, private accountService: AccountService) {


    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }
  ngOnInit(): void {
    //clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }


    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templatesRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }



}
