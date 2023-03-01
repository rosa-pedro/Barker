import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';

const UIComponents = [InputComponent, ButtonComponent];

@NgModule({
  declarations: [...UIComponents],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
  exports: [...UIComponents],
})
export class ComponentsModule {}
