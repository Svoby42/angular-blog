import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from 'src/app/entities/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  slug: string = "";
  selectedArticle: Article = new Article;
  articleList: Array<Article> = [];

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.route.params.subscribe(params => {
          this.slug = params['slug'];
        });
        this.articleService.getArticle(this.slug).subscribe(
          data => {
            this.selectedArticle = data;
          }
        )
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
    this.articleService.getArticle(this.slug).subscribe(
      data => {
        this.selectedArticle = data;
      }
    )
  }

}
