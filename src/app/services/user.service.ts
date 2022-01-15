import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../entities/article.model';
import { User } from '../entities/user.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{

  user: User = new User;

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`${API_URL}`, {headers: this.getHeaders});
  }

  getAllArticlesOfLoggedInUser(): Observable<any>{
    return this.http.get(API_URL+`/${this.authenticationService.currentUserValue.id}`, {headers: this.getHeaders});
  }

  saveUser(user: User): Observable<any>{
    return this.http.post(API_URL, user, {headers: this.getHeaders});
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(`${API_URL}/${user.username}`, user, {headers: this.getHeaders});
  }

  deleteUser(user: User): Observable<any>{
    return this.http.delete(`${API_URL}/${user.username}`, {headers: this.getHeaders});
  }
}
