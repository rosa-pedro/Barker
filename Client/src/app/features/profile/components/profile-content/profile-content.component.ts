import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
})
export class ProfileContentComponent implements OnInit {
  isAuthenticatedUser = false;

  activeTab = 'about';
  options = [
    { code: 'about', value: 'About', icon: 'badge' },
    { code: 'pets', value: 'Pets', icon: 'pets' },
    { code: 'posts', value: 'Posts', icon: 'markunread_mailbox' },
  ];

  constructor(readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.member$.subscribe((user) => {
      if (user) {
        this.isAuthenticatedUser = this.profileService.isAuthenticatedUser();
      }
    });
  }

  sendMessage() {}

  editProfile() {}
}
