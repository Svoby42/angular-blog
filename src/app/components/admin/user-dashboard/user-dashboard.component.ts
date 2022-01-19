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
  visible = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(
      data => {
        this.userList = data;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  editUser(user: User) {
    this.userService.editedUserSubject.next(user);
    this.router.navigate(['/admin/user/edit']);
  }

  deleteUser(user: User, index: number) {
    if (confirm("Potvrzeni: bude smazán uživatel " + user.username)) {
      this.userService.deleteUser(user).subscribe(
        data => {
          this.userList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.userList);
          this.dataSource.paginator = this.paginator;
        }, err => {
          this.errorMessage = "Neočekávaná chyba";
          console.log(err);
        }
      );
    }
  }

}
