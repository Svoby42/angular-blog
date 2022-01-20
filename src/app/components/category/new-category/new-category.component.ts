import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Category } from 'src/app/entities/category.model';
import { User } from 'src/app/entities/user.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  category: Category = new Category;
  currentUser: User = new User;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  save(){
    this.categoryService.saveCategory(this.category).subscribe(
      data => {
        this.router.navigate(['/admin']);
      }
    )
  }

  updateCategory(){
    this.categoryService.updateCategory(this.category).subscribe(
      data => {
        this.router.navigate(['/admin']);
      }
    )
  }

  saveCategory(){
    this.categoryService.saveCategory(this.category).subscribe(
      data => {
        this.router.navigate(['/admin']);
      }
    )
  }

}
