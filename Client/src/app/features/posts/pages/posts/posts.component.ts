import { Component, OnInit } from '@angular/core';
import { MicroPost } from '../../../../core/models/micro-post.model';
import { microPosts } from '../../../../shared/dummy/microPosts';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<MicroPost[]> | undefined;

  ngOnInit(): void {
    this.posts$ = of(microPosts);
  }

  filters = {
    general: {
      name: 'general',
      options: [
        'More comments',
        'Most liked',
        'Newest',
        'Oldest',
      ],
    },
    date: {
      name: 'date',
      options: [
        'Today',
        'Last week',
        'Last month',
      ],
    },
  };
}
