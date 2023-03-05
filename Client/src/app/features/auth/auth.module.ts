import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AuthRoutingModule,
    ComponentsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
