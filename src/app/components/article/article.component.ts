import { Parser } from '@angular/compiler/src/ml_parser/parser';
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
  articleContent: string = "";
  articleList: Array<Article> = [];

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.route.params.subscribe(params => {
          this.slug = params['slug'];
        });
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['articleslug'];
    });
    this.articleService.getArticle(this.slug).subscribe(
      data => {
        this.selectedArticle = data;
        this.articleContent = data['content'];
      }
    )
  }
}
