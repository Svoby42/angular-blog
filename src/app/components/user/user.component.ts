import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  hide = true;
  roles: Array<Role> = [Role.USER, Role.EDITOR];
  errorMessage: string = "";

  @Input() user: User = new User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.userService.saveUser(this.user).subscribe(
      data => {
        //this.save.emit(data);
        //$('#userModal').modal('hide');
      }, err => {
        //this.errorMessage = 'Stala se neočekávaná chyba';
        //console.log(err);
      }
    )
  }
}
