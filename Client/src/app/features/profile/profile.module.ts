import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { ProfileTabsComponent } from './components/profile-tabs/profile-tabs.component';
import { ProfileTabComponent } from './components/profile-tabs/profile-tab/profile-tab.component';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInfoComponent,
    ProfileContentComponent,
    ProfileTabsComponent,
    ProfileTabComponent,
    ProfileStatisticsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    TimeagoModule.forChild(),
  ],
})
export class ProfileModule {}
