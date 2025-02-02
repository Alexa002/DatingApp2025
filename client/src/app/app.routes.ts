import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent,
                title: 'Member Page',
            },
            {
                path: 'members/:username',
                component: MemberDetailComponent,
                title: 'Members Detail Page'
            },
            {
                path: 'lists',
                component: ListsComponent,
                title: 'Lists'
            },
            {
                path: 'messages',
                component: MessagesComponent,
                title: 'Messages'
            },

        ]
    },
    {
        path: 'errors',
        component: TestErrorsComponent,
        
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        
    },
    {
        path: 'server-error',
        component: ServerErrorComponent,
        
    },
    {
        path: '**',
        component: HomeComponent,
        pathMatch: 'full',
        title: 'Home Page'
    }
];

export default routes;