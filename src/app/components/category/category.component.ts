import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from 'src/app/entities/article.model';
import { Category } from 'src/app/entities/category.model';
import { Role } from 'src/app/entities/role.enum';
import { User } from 'src/app/entities/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  currentUser: User = new User;
  errorMessage: string = "";
  admin: Role = Role.ADMIN;
  editor: Role = Role.EDITOR;

  constructor(private router: Router, private route: ActivatedRoute, 
    private categoryService: CategoryService, private authenticationService: AuthenticationService) {
      this.router.events.subscribe( (val) => {
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
      this.authenticationService.currentUser.subscribe(
        data => {
          this.currentUser = data;
        }
      )
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categorySlug = params['catslug'];
    })
    this.categoryService.getCategory(this.categorySlug).subscribe(
      data =>{
        this.category = data;
      }, err =>{
        if(err?.status == 404){
          this.router.navigate(['/404']);
        }
      }
    );
    this.authenticationService.currentUser
  }

  canCreate(): boolean{
    return this.currentUser?.role === Role.ADMIN || this.currentUser?.role === Role.EDITOR;
  }

}
