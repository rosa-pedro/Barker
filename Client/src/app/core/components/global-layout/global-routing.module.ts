import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalLayoutComponent } from './global-layout.component';
import { PostsComponent } from '../../../features/posts/pages/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../features/posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../features/chat/chat.module').then(
            (m) => m.ChatModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalRoutingModule {}
