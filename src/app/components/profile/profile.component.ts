import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/entities/article.model';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  articleList: Array<Article> = [];
  date: Date = new Date();
  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getArticlesOfUser();
  }

  roleTextFormat(){
    if(this.currentUser.role === Role.ADMIN){
      return "Administrátor";
    }else if(this.currentUser.role === Role.EDITOR){
      return "Editor";
    }else{
      return "Uživatel";
    }
  }

  getCurrentUser(){
    this.authenticationService.currentUser.subscribe(
      data => {
        this.currentUser = data;
      }
    )
  }

  getArticlesOfUser(){
    this.userService.getAllArticlesOfLoggedInUser().subscribe(
      data => {
        this.articleList = data;
      }
    )
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  isEditor(){
    return this.currentUser?.role === Role.EDITOR;
  }

}
