import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { PostComponent } from './pages/post/post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [PostsComponent, PostComponent, CardComponent],
  imports: [PostsRoutingModule, CommonModule, ],
  providers: [],
  bootstrap: [],
})
export class PostsModule {}
