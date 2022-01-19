import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../entities/article.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/articles`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RequestBaseService{

  public article: Article = new Article;
  public editedArticle: Observable<Article>;
  public editedArticleSubject: BehaviorSubject<Article>;

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);

    this.editedArticleSubject = new BehaviorSubject<Article>(this.article);
    this.editedArticle = this.editedArticleSubject.asObservable();
  }

  getEditedArticle(): Observable<any>{
    return this.editedArticle;
  }

  getAllArticles(): Observable<any>{
    return this.http.get(API_URL);
  }

  getArticle(slug: string): Observable<any>{
    return this.http.get(`${API_URL}/${slug}`);
  }

  saveArticle(article: Article): Observable<any>{
    return this.http.post(API_URL, article, {headers: this.getHeaders});
  }

  updateArticle(article: Article): Observable<any>{
    return this.http.put(`${API_URL}/${article.slug}`, article, {headers: this.getHeaders});
  }

  deleteArticle(article: Article): Observable<any>{
    return this.http.delete(`${API_URL}/${article.slug}`, {headers: this.getHeaders});
  }

}
