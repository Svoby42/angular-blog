import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/entities/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css']
})
export class CategoryDashboardComponent implements OnInit {

  categoryList: Array<Category> = [];
  errorMessage: string = "";
  displayedColumns: string[] = ['id', 'title', 'description', 'slug', 'create_time'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categoryList = data;
        this.dataSource = new MatTableDataSource(this.categoryList);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  editCategory(category: Category){
    this.categoryService.editedCategorySubject.next(category);
    this.router.navigate(['/admin/category/edit']);
  }

  deleteCategory(category: Category, index: number){
    if(confirm("Potvrzení: bude smazána kategorie " + category.slug)){
      this.categoryService.deleteCategory(category).subscribe(
        data => {
          this.categoryList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.categoryList);
          this.dataSource.paginator = this.paginator;
        }, err => {
          this.errorMessage = "Neočekávaná chyba";
          console.log(err);
        }
      );
    }
  }

}
