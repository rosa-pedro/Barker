import {Component, Input} from '@angular/core';
import {EventTypes} from "../toaster.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(100%)'}),
        animate(200),
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0, transform: 'translateY(100%)'})),
      ]),
    ]),
  ],
})
export class ToastComponent {
  @Input() message!: string;
  @Input() type!: EventTypes;

  styles = {
    error: 'bg-error',
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-info',
  };

  constructor() {
  }
  get style() {
    return this.styles[this.type]
  }


}
