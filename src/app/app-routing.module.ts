import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ArticleComponent } from './components/article/article.component';
import { CategoryComponent } from './components/category/category.component';
import { NewArticleComponent } from './components/category/new-article/new-article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { Role } from './entities/role.enum';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component'

const routes: Routes = [
  { path: '', redirectTo: 'domu', pathMatch: 'full'},
  { path: 'domu', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrace', component: RegisterComponent },
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: [Role.USER, Role.EDITOR, Role.ADMIN]} },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] }},
  { path: 'admin/user/new', component: RegisterComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },
  { path: 'admin/user/edit', component: UserComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },
  { path: '401', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':catslug', component: CategoryComponent },
  { path: ':catslug/new', component: NewArticleComponent, pathMatch: 'full' },
  { path: ':catslug/:articleslug', component: ArticleComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
