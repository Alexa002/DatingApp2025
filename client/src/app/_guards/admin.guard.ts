import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
 
  const accountService = inject(AccountService) 
  const toast = inject(ToastrService) 



  return accountService.currentUser$.pipe(
    map(user => {
      if(user.roles.includes('Admin') || user.roles.includes('Moderator')){
        return true;
      }
      toast.error('You can not enter this area!')
      return false;

    })
  );
};
