import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.scss'],
})
export class ProfileStatisticsComponent {
  constructor(readonly profileService: ProfileService) {}
}
