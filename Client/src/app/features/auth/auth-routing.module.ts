import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './components/auth-layout/auth-layout.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
