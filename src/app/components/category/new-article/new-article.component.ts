import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/entities/article.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  article: Article = new Article;

  constructor() { }

  ngOnInit(): void {
  }

}
