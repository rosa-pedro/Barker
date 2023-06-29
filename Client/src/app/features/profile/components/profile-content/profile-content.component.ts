import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Member } from '../../../../core/models/member/member.model';
import { PetService } from '../../services/pet.service';

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

  constructor(
    readonly profileService: ProfileService,
    readonly petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      if (params['tab']) {
        this.activeTab = params['tab'];
        this.selectionChange(params['tab']);
      } else {
        this.router.navigate([], { queryParams: { tab: 'about' } });
      }
    });
    console.log(this.route.snapshot.params['tab']);
    this.profileService.member$.subscribe((user) => {
      if (user) {
        this.isAuthenticatedUser = this.profileService.isAuthenticatedUser();
      }
    });
  }

  sendMessage() {}

  editProfile() {}

  selectionChange($event: string) {
    switch ($event) {
      case 'pets':
        this.profileService.member$.subscribe((member: Member | null) => {
          console.log(member?.userName);
          if (member) {
            this.petService.getPets(member.userName).subscribe();
          }
        });
        break;
      case 'posts':
        this.profileService.getPostsFromUser(
          this.route.snapshot.params['username']
        );
    }
  }
}
