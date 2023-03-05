import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GlobalRoutingModule } from './global-routing.module';
import {ComponentsModule} from "../../../shared/components/components.module";

@NgModule({
  declarations: [
  ],
  imports: [
    GlobalRoutingModule,
    CommonModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: []
})
export class GlobalModule { }
