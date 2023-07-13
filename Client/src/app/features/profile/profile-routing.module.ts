import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPetComponent } from './pages/new-pet/new-pet.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { PeopleComponent } from './pages/people/people.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
  {
    path: 'profile/:username/new-pet',
    component: NewPetComponent,
  },
  {
    path: 'profile/:username/edit-pet',
    component: NewPetComponent,
  },
  {
    path: 'profile/:username/edit-profile',
    component: EditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
