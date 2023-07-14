import { Component, HostListener, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  loading = false;
  shouldScroll = false;
  search = new FormControl('');

  constructor(public profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const viewportHeight = window.innerHeight;
    const pageHeight = window.document.body.scrollHeight;
    const pageScrollY = window.scrollY;
    const pixelsToReachBottom = pageHeight - (pageScrollY + viewportHeight);
    if (this.profileService.hasNext && pixelsToReachBottom <= 20) {
      if (!this.loading) {
        this.loading = true;

        this.loadMore();
      }
    }
    this.shouldScroll = pageScrollY > 500;
  }

  private loadUsers() {
    this.profileService.getUsers().subscribe();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  private loadMore() {
    this.profileService.getNextMembers().subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }
}
