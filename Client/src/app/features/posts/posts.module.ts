import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PostComponent } from './pages/post/post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ActionTabComponent } from './components/action-tab/action-tab.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TimeagoModule } from 'ngx-timeago';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPostComponent } from './pages/new-post/new-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    ActionTabComponent,
    PostCardComponent,
    CommentsComponent,
    NewPostComponent,
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    ComponentsModule,
    TimeagoModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [PostsComponent],
})
export class PostsModule {}
