import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(UserComponent) child: UserComponent | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.userList = data;
      }
    )
  }

  editUser(user: User){
    
  }

  deleteUser(user: User, index: number) {
    this.userService.deleteUser(user).subscribe(
      data => {
        this.userList.splice(index, 1);
      }, err => {
        this.errorMessage = "Neočekávaná chyba";
        console.log(err);
      }
    )
  }

}
