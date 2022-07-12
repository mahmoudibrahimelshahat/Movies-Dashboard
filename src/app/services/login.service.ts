import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  MAIN_LINK: string = 'https://test-api.storexweb.com/api/login';
  
  constructor(private http: HttpClient, private router: Router) { 
  }

  login(user: any) {
    return this.http.post<{ authorisation: {token:string} }>(this.MAIN_LINK, user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token') || undefined;
    if (!token)return false;
 
    
    return true
  }

  getToken() {    
    return localStorage.getItem('token');
  }
  
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
