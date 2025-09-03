import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddPlaceComponent } from './places/add-place/add-place.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { MyPostsComponent } from './posts/my-posts/my-posts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-place', component: AddPlaceComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'my-posts', component: MyPostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
