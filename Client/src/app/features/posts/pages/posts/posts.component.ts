import { Component, HostListener, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  // posts$: Observable<Post[]> | undefined;

  constructor(public postService: PostService) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      this.postService.hasNext &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {},
    });
  }

  private loadMore() {
    this.postService.getNextPosts().subscribe();
  }

  filters = {
    general: {
      name: 'general',
      options: ['More comments', 'Most liked', 'Newest', 'Oldest'],
    },
    date: {
      name: 'date',
      options: ['Today', 'Last week', 'Last month'],
    },
  };
}
