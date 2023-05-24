import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() filterName: string = 'Filter by';
  @Input() hasAll: boolean = true;

  selectedOption: string = 'All';
  active = false;

  constructor(private _eref: ElementRef) {}

  onClick(event: any) {
    if (
      !this._eref.nativeElement.contains(
        event.target
      )
    ) {
      this.active = false;
    }
  }
}
