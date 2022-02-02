import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profil']);
    }
  }

  login2(){
    this.authenticationService.login(this.user).subscribe(data => {
      this.router.navigate(['/profil']);
    }, err => {
      this.errorMessage = "Uživatelské jméno nebo heslo je nesprávné";
      console.log(err);
    });
  }
  login(){
    this.authenticationService.login(this.user).subscribe(data => {
      this.router.navigate(['/profil']);
    });
  }

}
