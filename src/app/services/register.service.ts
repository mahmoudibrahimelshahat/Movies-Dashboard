import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  USER_API : string = 'https://test-api.storexweb.com/api/register';
  constructor(private http: HttpClient) { }

  createUser(value: any) {
    return this.http.post(this.USER_API, value);
  }
}
