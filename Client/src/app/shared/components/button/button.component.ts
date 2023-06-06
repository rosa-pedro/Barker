import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() message: string = '';
  @Input() type: string = 'primary';
  @Input() size: string = '';
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;

  colors = {
    error: {
      color: 'bg-error',
      borderColor: 'border-2 border-error',
      text: 'text-error',
    },
    success: {
      color: 'bg-success',
      borderColor: 'border-2 border-success',
      text: 'text-success',
    },
    primary: {
      color: 'bg-primary',
      borderColor: 'border-2 border-primary',
      text: 'text-primary',
    },
    warning: {
      color: 'bg-warning',
      borderColor: 'border-2 border-warning',
      text: 'text-warning',
    },
    info: {
      color: 'bg-info',
      borderColor: 'border-2 border-info',
      text: 'text-info',
    },
    default: {
      color: 'bg-white',
      borderColor: 'border-2 border-white',
      text: 'text-white',
    },
  };

  get color(): string {
    // return 'bg-' + this.type
    return this.colors[
      this.type as keyof typeof this.colors
    ].color;
  }

  get borderColor(): string {
    return this.colors[
      this.type as keyof typeof this.colors
    ].borderColor;
  }

  get textColor(): string {
    return this.colors[
      this.type as keyof typeof this.colors
    ].text;
  }
}
