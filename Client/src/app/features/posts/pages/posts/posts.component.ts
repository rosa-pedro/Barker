import { Component, HostListener, OnInit } from '@angular/core';
import { PostService, RequestSpec } from '../../services/post.service';
import { DropdownOption } from '../../../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  filtering: RequestSpec = {};

  constructor(public postService: PostService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const viewportHeight = window.innerHeight;
    const pageHeight = window.document.body.scrollHeight;
    const pageScrollY = window.scrollY;
    const pixelsToReachBottom = pageHeight - (pageScrollY + viewportHeight);
    if (this.postService.hasNext && pixelsToReachBottom <= 0) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts() {
    this.postService.getPosts().subscribe();
  }

  private loadMore() {
    this.postService.getNextPosts().subscribe();
  }

  filters = {
    general: {
      name: 'general',
      options: [
        { code: 'mostCommented', value: 'More comments' },
        { code: 'mostLiked', value: 'Most liked' },
        { code: 'newest', value: 'Newest' },
        { code: 'oldest', value: 'Oldest' },
      ] as DropdownOption[],
    },
    date: {
      name: 'date',
      options: [
        { code: 'today', value: 'Today' },
        { code: 'lastWeek', value: 'Last week' },
        { code: 'lastMonth', value: 'Last month' },
        { code: 'lastYear', value: 'Last year' },
      ] as DropdownOption[],
    },
  };

  orderBy(filter: 'general' | 'date', option: string) {
    console.log(this.filters[filter].options.find((o) => o.code === option));

    const findInFilters = this.filters[filter].options.find(
      (o) => o.code === option
    );

    const chosenOption = findInFilters
      ? findInFilters
      : { code: 'all', value: 'All' };
    if (filter === 'general') {
      if (option === 'all') {
        this.filtering.orderBy = undefined;
      }
      this.filtering.orderBy = chosenOption!.code;
    }
    if (filter === 'date') {
      this.filtering.from = chosenOption!.code;
      if (option === 'all') {
        this.filtering.from = undefined;
      }
    }

    this.postService.getPostsFiltered(this.filtering, false).subscribe({
      next: (value) => {
        if (value === undefined) {
          // TODO: Implement a toast to display this message
          console.log(value);
        }
      },
    });
  }
}
