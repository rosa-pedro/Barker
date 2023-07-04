import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { GlobalLayoutComponent } from './core/components/global-layout/global-layout.component';
import { ComponentsModule } from './shared/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserTabComponent } from './core/components/user-tab/user-tab.component';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlobalLayoutComponent,
    UserTabComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    TimeagoModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
