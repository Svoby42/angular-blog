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

  arrayValues = new Map<String, [String, Boolean]>();
  arrayTables = ["userTable", "articleTable", "categoryTable"]

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.arrayTables.forEach(element => {
      this.arrayValues.set(element, ["Zobrazit", false]);
    });
  }

  toggleDisplay(name: string) {
    var var1 = "";
    var var2 = false;
    this.arrayValues.get(name)?.forEach((element) => {
      if (typeof (element) === 'string') {
        if(element === "Zobrazit"){
          var1 = "Skrýt";
        }
        else{
          var1 = "Zobrazit";
        }
      }
      if (typeof (element) === 'boolean') {
        var2 = !element;
      }
    });
    this.arrayValues.delete(name);
    this.arrayValues.set(name, [var1, var2]);
  }

  getText(name: string) {
    return this.arrayValues.get(name)?.[0];
  }

  isVisible(name: string) {
    return this.arrayValues.get(name)?.[1];
  }

}
