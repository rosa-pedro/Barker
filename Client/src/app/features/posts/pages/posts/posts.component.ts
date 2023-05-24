import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  // posts$: Observable<Post[]> | undefined;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        console.log(posts);
      },
    });
  }

  loadMore() {
    this.postService.getNextPosts().subscribe();
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
