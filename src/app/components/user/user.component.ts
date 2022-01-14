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

  @Input() user: User = new User;
  constructor(private userService: AuthenticationService) { }

  ngOnInit(): void {
  }

  saveUser(){
    console.log(this.user.password);
    console.log(this.confirmedPassword);
    //this.userService.register(this.user);
  }
}
