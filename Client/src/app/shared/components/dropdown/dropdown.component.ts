import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface DropdownOption {
  code: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DropdownComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() filterName: string = 'Filter by';
  @Input() hasAll: boolean = true;

  @Input() label: string = '';
  @Input() preSelect: string | null = '';

  @Output('selectionChange') selectionChange = new EventEmitter<string>();

  defaultOption: DropdownOption = { code: 'all', value: 'All' };
  selectedOption: DropdownOption = this.defaultOption;
  active = false;

  constructor(private _eref: ElementRef) {}

  ngOnInit(): void {
    if (this.preSelect) {
      // @ts-ignore
      this.selectedOption = this.options.find(
        (o) => o.code === this.preSelect!.toLowerCase()
      );
    }
  }

  private onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }

  onOptionClick(option: DropdownOption) {
    this.selectedOption = option;
    this.active = false;
    this.selectionChange.emit(option.code);
  }
}
