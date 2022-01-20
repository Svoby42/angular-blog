import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../entities/category.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/categories`

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends RequestBaseService{

  public category: Category = new Category;
  public editedCategory: Observable<Category>;
  public editedCategorySubject: BehaviorSubject<Category>;

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);

    this.editedCategorySubject = new BehaviorSubject<Category>(this.category);
    this.editedCategory = this.editedCategorySubject.asObservable();
  }

  getEditedCategory(): Observable<any>{
    return this.editedCategory;
  }

  getCategory(slug: String): Observable<any>{
    return this.http.get(`${API_URL}/${slug}`);
  }

  getAllCategories(): Observable<any>{
    return this.http.get(API_URL);
  }

  saveCategory(category: Category): Observable<any>{
    return this.http.post(API_URL, category, {headers: this.getHeaders});
  }

  deleteCategory(category: Category): Observable<any>{
    return this.http.delete(`${API_URL}/${category.id}`, {headers: this.getHeaders});
  }

  

}
