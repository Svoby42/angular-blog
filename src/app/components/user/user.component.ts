import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  @Input() user: User = new User;
  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(
      data => {
        this.currentUser = data;
      }
    )
  }

  ngOnInit(): void {
  }

  updateUser(){
    this.userService.updateUser(this.currentUser);
  }

  saveUser(){
    console.log(this.user.password);
    console.log(this.confirmedPassword);
    //this.userService.register(this.user);
  }
}
