import {Component, Input} from '@angular/core';
import {EventTypes} from "../toaster.service";
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 0}),

        group([
          animate(300, style({height: 0})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
          animate(300, style({height: '*'})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ])
    ])
  ]
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
