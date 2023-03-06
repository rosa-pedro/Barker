import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './pages/posts/post/post.component';

@NgModule({
  declarations: [
  
    PostComponent
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class PostsModule { }
