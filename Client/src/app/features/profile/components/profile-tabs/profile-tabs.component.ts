import { Component, ContentChildren, QueryList } from '@angular/core';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
})
export class ProfileTabsComponent {
  @ContentChildren(ProfileTabComponent) tabs:
    | QueryList<ProfileTabComponent>
    | undefined;

  selectTab(tab: ProfileTabComponent) {
    this.tabs?.toArray().forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }
}
