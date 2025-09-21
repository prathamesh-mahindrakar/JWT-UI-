import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Forbidden } from './forbidden/forbidden';
import { authGuard } from './_auth/auth-guard';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'admin', component: Admin, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'user', component: User, canActivate: [authGuard], data: { roles: ['USER'] } },
    { path: 'forbidden', component: Forbidden }
];
