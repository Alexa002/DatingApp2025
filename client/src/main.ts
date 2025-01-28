import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import routes from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './app/_interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers:[
    provideAnimations(),
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideToastr({positionClass: 'toast-bottom-right'}),
    provideRouter(routes),
   
  ]
})
  .catch((err) => console.error(err));