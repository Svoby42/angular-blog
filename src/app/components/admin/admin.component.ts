import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userTableVisible = false;
  userButtonText: string = "";
  articleTableVisible = false;
  articleButtonText: string = "";
  categoryTableVisible = false;
  categoryButtonText: string = "";

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.userButtonText = "Zobrazit";
    this.userTableVisible = false;
  }

  toggleUserTableDisplay(){
    this.userTableVisible = !this.userTableVisible;
    if(this.userTableVisible){
      this.userButtonText = "Skrýt";
    }else{
      this.userButtonText = "Zobrazit";
    }
  }

}
