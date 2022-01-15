import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User;
  errorMessage: string = "";
  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(
      data =>{
        this.currentUser = data;
      }
    )
  }

  ngOnInit(): void {
    if(this.currentUser?.id && this.currentUser?.role !== Role.ADMIN){
      this.router.navigate(['/profil']);
    }
  }

  register(){
    this.authenticationService.register(this.user).subscribe(
      data => {
        this.router.navigate(['/login']);
      }, err => {
        if(err?.status == 409){
          this.errorMessage = 'Jméno již existuje';
        }else{
          this.errorMessage = 'Chyba ' +  err.errorMessage;
          console.log(err);
        }
      })
  }

}
