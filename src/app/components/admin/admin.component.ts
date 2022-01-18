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

  userList: Array<User> = [];
  selectedUser: User = new User;
  errorMessage: string = "";
  displayedColumns: string[] = ['id', 'username', 'name', 'role', 'create_time', 'last_login', 'actions'];
  dataSource = new MatTableDataSource<User>();
  userTableVisible = false;
  userButtonText: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.userButtonText = "Zobrazit";
    this.userTableVisible = false;
  }

  toggleDisplay(){
    this.userTableVisible = !this.userTableVisible;
    if(this.userTableVisible){
      this.userButtonText = "Skrýt";
    }else{
      this.userButtonText = "Zobrazit";
    }
  }

}
