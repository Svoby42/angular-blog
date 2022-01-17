import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  
  userList: Array<User> = [];
  selectedUser: User = new User;
  errorMessage: string = "";
  displayedColumns: string[] = ['id', 'username', 'name', 'role', 'create_time', 'last_login', 'actions'];
  dataSource = new MatTableDataSource<User>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  editUser(user: User){
    this.userService.editedUserSubject.next(user);
  }

  deleteUser(user: User, index: number) {
    if(confirm("Potvrzeni: bude smazán uživatel " + user.username)){
      this.userService.deleteUser(user).subscribe(
        data => {
          this.userList.splice(index, 1);
        }, err => {
          this.errorMessage = "Neočekávaná chyba";
          console.log(err);
        }
      );
      this.reloadComponent();
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}
