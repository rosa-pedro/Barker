import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPetComponent } from './pages/new-pet/new-pet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile/:username',
    pathMatch: 'full',
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
  {
    path: 'profile/:username/new-pet',
    component: NewPetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
