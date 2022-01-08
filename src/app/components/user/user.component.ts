import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roles: Array<Role> = [Role.USER, Role.EDITOR];
  errorMessage: string = "";

  @Input() user: User = new User;
  @Output() save = new EventEmitter<any>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.userService.saveUser(this.user).subscribe(
      data => {
        this.save.emit(data);
        $('#userModal').modal('hide');
      }, err => {
        this.errorMessage = 'Stala se neočekávaná chyba';
        console.log(err);
      }
    )
  }

  showUserModal(){
    $('#userModal').modal('show');
  }

}
