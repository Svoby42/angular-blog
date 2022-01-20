import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User;
  errorMessage: string = "";
  currentUser: User = new User;
  confirmedPassword: string = "";
  userEdit: User = new User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
    this.authenticationService.currentUser.subscribe(
      data => {
        this.currentUser = data;
      }
    )
  }

  ngOnInit(): void {
    if (this.currentUser?.id && this.currentUser?.role !== Role.ADMIN) {
      this.router.navigate(['/profil']);
    } else {
      this.getEditedUser();
      if (this.userEdit?.id) {
        this.user = this.userEdit;
        this.user.password = "";
      }
    }
  }

  getEditedUser() {
    this.userService.getEditedUser().subscribe(
      data => {
        this.userEdit = data;
      }
    )
  }

  register() {
    if (this.userEdit?.id) {
      this.userService.updateUser(this.userEdit).subscribe(
        data => {
          this.router.navigate(['/login']);
        }, err => {
          if (err?.status == 409) {
            this.errorMessage = 'Uživatelské jméno již existuje';
          } else{
            this.errorMessage = 'Chyba ' + err.errorMessage;
            console.log(err);
          }
        }
      )
    } else {
      this.authenticationService.register(this.user).subscribe(
        data => {
          this.router.navigate(['/login']);
        }, err => {
          if (err?.status == 409) {
            this.errorMessage = 'Uživatelské jméno již existuje';
          } else {
            this.errorMessage = 'Chyba ' + err.errorMessage;
            console.log(err);
          }
        })
    }
  }
}
