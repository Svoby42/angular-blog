import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/entities/article.model';
import { Category } from 'src/app/entities/category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articleList: Array<Article> = [];
  categoryList: Array<Category> = [];

  constructor(private articleService: ArticleService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
  }

  getArticles(){
    this.articleService.getAllArticles().subscribe(
      data => {
        this.articleList = data;
      }
    )
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categoryList = data;
      }
    )
  }

}
