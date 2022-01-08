import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './entities/role.enum';
import { User } from './entities/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router){
    this.authenticationService.currentUser.subscribe(
      data =>{
        this.currentUser = data;
      }
    )
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  isEditor(){
    return this.currentUser?.role === Role.EDITOR;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
