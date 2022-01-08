import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue?.id){
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
