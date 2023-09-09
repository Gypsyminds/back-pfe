import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8086/api/auth/';
const path ='p://127.0.0.1:5000/ma_fonction';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, country: string,birth_date: Date): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      country,
      birth_date,
    
    }, httpOptions);
  }
}
