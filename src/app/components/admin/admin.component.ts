import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Array<User> = [];
  selectedUser: User = new User;
  errorMessage: string = "";
  displayedColumns: string[] = ['id', 'username', 'name', 'role', 'create_time', 'last_login', 'actions']

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.userList = data;
      }
    );
  }

  editUser(user: User){
    this.userService.editedUserSubject.next(user);
  }

  deleteUser(user: User, index: number) {
    if(confirm("Potvrzeni: bude smazán uživatel " + user.username)){
      this.userService.deleteUser(user).subscribe(
        data => {
          this.userList.splice(index, 1);
        }, err => {
          this.errorMessage = "Neočekávaná chyba";
          console.log(err);
        }
      );
      this.reloadComponent();
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}
