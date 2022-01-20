import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './entities/category.model';
import { Role } from './entities/role.enum';
import { User } from './entities/user.model';
import { AuthenticationService } from './services/authentication.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';

  categories: Array<Category> = [];
  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private categoryService: CategoryService, private router: Router){
    this.getCurrentUser();
    this.getCategories();
  }

  getCurrentUser(){
    this.authenticationService.currentUser.subscribe(
      data =>{
        this.currentUser = data;
      }
    )
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
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
