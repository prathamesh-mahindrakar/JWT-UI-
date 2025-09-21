import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuth } from '../services/user-auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const userAuth = inject(UserAuth);
    const router = inject(Router);

    // ✅ Skip if No-Auth header is set
    if (req.headers.get('No-Auth') === 'True') {
        return next(req);
    }

    const token = userAuth.getToken();
    if (!token) {
        router.navigate(['login']);
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq).pipe(
        catchError((err) => {
            if (err.status === 401) {
                router.navigate(['login']);
            } else if (err.status === 403) {
                router.navigate(['forbidden']);
            }
            return throwError(() => new Error('Something went wrong'));
        })
    );
};
