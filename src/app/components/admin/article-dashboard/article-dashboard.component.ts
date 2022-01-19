import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/entities/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  articleList: Array<Article> = [];
  selectedArticle: Article = new Article;
  errorMessage: string = "";
  displayedColumns: string[] = ['id', 'title', 'slug', 'create_time', 'edit_time', 'author_name', 'actions'];
  dataSource = new MatTableDataSource<Article>();
  visible = false;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this.articleService.getAllArticles().subscribe(
      data => {
        this.articleList = data;
        this.dataSource = new MatTableDataSource(this.articleList);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  editArticle(article: Article){
    this.articleService.editedArticleSubject.next(article);
    this.router.navigate(['/admin/article/edit']);
  }

  deleteArticle(article: Article, index: number){
    if(confirm("Potvrzení: bude smazán článek " + article.slug)){
      this.articleService.deleteArticle(article).subscribe(
        data => {
          this.articleList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.articleList);
          this.dataSource.paginator = this.paginator;
        }, err => {
          this.errorMessage = "Neočekávaná chyba";
          console.log(err);
        }
      );
    }
  }

}
