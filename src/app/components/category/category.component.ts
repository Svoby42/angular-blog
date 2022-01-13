import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from 'src/app/entities/article.model';
import { Category } from 'src/app/entities/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categorySlug: string = "";
  category: Category = new Category;
  articles: Array<Article> = []

  constructor(private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) {
      this.router.events.subscribe( (val) => {                      //we have many categories - ngOnInit happens only once, we need to somehow find out if the slug was replaced, it can be done this way
        if(val instanceof NavigationEnd){
          this.route.params.subscribe(params => {
            this.categorySlug = params['catslug'];
          });
          this.categoryService.getCategory(this.categorySlug).subscribe(
            data =>{
              this.category = data;
            }
          );
        }
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categorySlug = params['catslug'];
    })
    this.categoryService.getCategory(this.categorySlug).subscribe(
      data =>{
        this.category = data;
      }
    );
  }

}
