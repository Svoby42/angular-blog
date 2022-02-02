import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.model';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";

const API_URL = `${environment.BASE_URL}/api/authentication/`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userFromCookie: User = new User;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    let storageUser;
    const storageUserAsStr = cookieService.get('currentUser');
    if(storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(API_URL + 'sign-in', user).pipe(
      map(response => {
        if(response){

          var tokenDecoded = this.decodeAccessToken(response.token);
          console.log(tokenDecoded);
          this.userFromCookie.id = tokenDecoded.userId;
          this.userFromCookie.username = tokenDecoded.sub;
          this.userFromCookie.role = tokenDecoded.roles;
          this.userFromCookie.token = response
          console.log(this.userFromCookie.token);
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any>{
    return this.http.post(API_URL + 'sign-up', user);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }

  decodeAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    } catch(error){
      return error;
    }
  }

}
