import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component'

const routes: Routes = [
  { path: '', redirectTo: 'domu', pathMatch: 'full'},
  { path: 'domu', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrace', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
