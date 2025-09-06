import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddPlaceComponent } from './places/add-place/add-place.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { MyPostsComponent } from './posts/my-posts/my-posts.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFriendRequestsComponent } from "./my-friend-requests/my-friend-requests.component";
import { PlaceListComponent } from './places/place-list/place-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddPlaceComponent,
    CreatePostComponent,
    PostListComponent,
    MyPostsComponent,
    SearchUsersComponent,
    UsersListComponent,
    MyProfileComponent,
    PlaceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MyFriendRequestsComponent
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
