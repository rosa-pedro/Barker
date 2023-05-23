import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toaster/toast/toast.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CardComponent } from './card/card.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TtdirectiveComponent } from './tooltip/ttdirective/ttdirective.component';

const UIComponents = [
  InputComponent,
  ButtonComponent,
  DropdownComponent,
  ToasterComponent,
  ToastComponent,
  CardComponent,
  TooltipComponent,
  TtdirectiveComponent,
];

@NgModule({
  declarations: [...UIComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [...UIComponents],
})
export class ComponentsModule {}
