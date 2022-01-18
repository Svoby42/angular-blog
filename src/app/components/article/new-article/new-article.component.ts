import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from 'src/app/entities/article.model';
import { Category } from 'src/app/entities/category.model';
import { User } from 'src/app/entities/user.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  article: Article = new Article;
  currentUser: User = new User;
  categoryList: Array<Category> = [];
  categorySlug: string = "";

  constructor(private articleService: ArticleService, private categoryService: CategoryService,
    private router: Router, private authenticationService: AuthenticationService, 
    private route: ActivatedRoute) { 
      this.router.events.subscribe( (val) => {
        if(val instanceof NavigationEnd){
          this.route.params.subscribe(params => {
            this.categorySlug = params['catslug'];
          });
        }
      });
      this.categoryService.getAllCategories().subscribe(
        data => {
          this.categoryList = data;
          this.categoryList.forEach((category, index) => {
            if(category.slug === this.categorySlug || this.article?.category_slug === category.slug){
              this.categoryList.splice(index, 1);
            }
          })
        }
      )
  }

  ngOnInit(): void {
    this.editingArticle();
    this.authenticationService.currentUser.subscribe(
      data =>{
        this.currentUser = data;
      }
    )
  }

  editingArticle(){
    console.log('pokus');
    if(this.router.url === '/admin/article/edit'){
      this.articleService.getEditedArticle().subscribe(
        data => {
          this.article = data;
        }
      )
    }
  }

  updateArticle(){
    this.articleService.updateArticle(this.article).subscribe(
      data => {
        this.router.navigate(['/admin']);
      }
    )
  }

  save(){
    this.articleService.saveArticle(this.article).subscribe(
      data => {
        this.router.navigate(['/', this.article.category_slug]);
        console.log(this.article.category_slug);
      }
    );
  }

}
