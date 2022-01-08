import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/entities/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleList: Array<Article> = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      data => {
        this.articleList = data;
      }
    )
  }

}
