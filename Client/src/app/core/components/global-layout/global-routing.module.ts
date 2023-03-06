import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalLayoutComponent} from "./global-layout.component";
import {PostsComponent} from "../../../features/posts/pages/posts/posts.component";

const routes: Routes = [
  {
    path: '',
    component: GlobalLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../features/posts/posts.module').then((m) => m.PostsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalRoutingModule {
}
