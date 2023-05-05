import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CardComponent } from './components/card/card.component';
import { PostComponent } from './pages/post/post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [PostsComponent, PostComponent, CardComponent],
  imports: [PostsRoutingModule, CommonModule, ComponentsModule],
  providers: [],
  bootstrap: [],
})
export class PostsModule {}
