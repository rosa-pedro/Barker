import { Component, HostListener, OnInit } from '@angular/core';
import { PostService, RequestSpec } from '../../services/post.service';
import { DropdownOption } from '../../../../shared/components/dropdown/dropdown.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  filtering: RequestSpec = {};
  search: FormControl = new FormControl('');
  shouldScroll = false;
  buttonAdd = 'New post';

  constructor(public postService: PostService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const viewportHeight = window.innerHeight;
    const pageHeight = window.document.body.scrollHeight;
    const pageScrollY = window.scrollY;
    const pixelsToReachBottom = pageHeight - (pageScrollY + viewportHeight);
    if (this.postService.hasNext && pixelsToReachBottom <= 0) {
      this.loadMore();
    }
    this.shouldScroll = pageScrollY > 500;
    console.log(this.shouldScroll);
  }

  ngOnInit(): void {
    this.loadPosts();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value !== '') this.filtering.search = value;
      else this.filtering.search = undefined;

      this.searchPost();
    });
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

  orderBy(filter: 'general' | 'date', option?: string) {
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
    this.searchPost();
  }

  searchPost() {
    this.postService.getPostsFiltered(this.filtering, false).subscribe({
      next: (value) => {
        console.log(value);
        if (value === undefined) {
          // TODO: Implement a toast to display this message
          console.log(value);
        }
      },
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  newPost() {
    this.router.navigate(['./new-post']);
  }
}
