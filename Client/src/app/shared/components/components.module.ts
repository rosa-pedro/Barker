import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
// import {ToasterComponent} from './toaster/toaster.component';
// import {ToastComponent} from './toaster/toast/toast.component';
import { CardComponent } from '../../features/posts/components/card/card.component';
import { DropdownComponent } from './dropdown/dropdown.component';

const UIComponents = [
  InputComponent,
  ButtonComponent,
  DropdownComponent,
  // ToasterComponent,
  // ToastComponent,
  // CardComponent
];

@NgModule({
  declarations: [...UIComponents],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [],
  exports: [...UIComponents],
})
export class ComponentsModule {}
