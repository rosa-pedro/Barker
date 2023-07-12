import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    readonly profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  ngOnDestroy(): void {
    this.profileService.clear();
  }
  getProfile() {
    this.route.queryParams.pipe().subscribe(() => {
      const username = this.route.snapshot.params['username'];
      if (username) {
        this.profileService.getMember(username).subscribe(() => {});
      }
    });
  }

  onPhotoSelect(event: any) {
    if (event.target.files.length > 0) {
      this.profileService.setPetPhoto(event.target.files[0]).subscribe({
        next: () => {
          this.getProfile();
        },
        error: (error) => console.log(error),
      });
    }
  }
}
