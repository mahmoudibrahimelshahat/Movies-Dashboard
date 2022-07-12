import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public loginService: LoginService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = this.loginService.isLoggedIn() ? request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.loginService.getToken()}`
            }
        }) : request.clone({
            setHeaders: {
                'content-type': 'application/json'
            }
        })
        return next.handle(request);
    }
}