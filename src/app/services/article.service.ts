import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../entities/article.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/articles`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
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

  deleteArticle(article: Article): Observable<any>{
    return this.http.delete(`${API_URL}/${article.id}`, {headers: this.getHeaders});
  }

}
