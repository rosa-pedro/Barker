import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ButtonComponent} from './button/button.component';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToasterComponent} from './toaster/toaster.component';
import {ToastComponent} from './toaster/toast/toast.component';
import { PostComponent } from '../../features/posts/components/post/post.component';

const UIComponents = [
  InputComponent,
  ButtonComponent,
  ToasterComponent,
  ToastComponent,
  PostComponent
];

@NgModule({
  declarations: [...UIComponents],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [],
  exports: [...UIComponents],
})
export class ComponentsModule {
}
