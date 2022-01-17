import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  roles: Array<Role> = [Role.USER, Role.EDITOR];
  errorMessage: string = "";
  confirmedPassword:string = "";
  invalid: boolean = true;
  pattern:string = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$";
  currentUser: User = new User;
  userEdit: User = new User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
    this.authenticationService.currentUser.subscribe(
      data => {
        this.currentUser = data;
      }
    )
    this.userService.getEditedUser().subscribe(
      data => {
        this.userEdit = data;
      }
    )
  }

  ngOnInit(): void {
    this.userService.getEditedUser().subscribe(
      data => {
        this.userEdit = data;
        console.log(this.userEdit.username);
      }
    )
  }

  updateUser(){
    this.userService.updateUser(this.userEdit).subscribe(
      data => {
        this.router.navigate(['/admin']);
      }
    );
  }

  saveUser(){
    console.log(this.userEdit.password);
    console.log(this.confirmedPassword);
    //this.userService.register(this.user);
  }
}
