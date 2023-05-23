import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CardComponent } from '../../shared/components/card/card.component';
import { PostComponent } from './pages/post/post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ActionTabComponent } from './components/action-tab/action-tab.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    ActionTabComponent,
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class PostsModule {}
