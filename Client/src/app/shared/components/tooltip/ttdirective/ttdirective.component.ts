import {
  ApplicationRef,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '../tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TtdirectiveComponent {
  @Input('tooltip') data = '';

  // private componentRef: ComponentRef<any>;

  constructor(
    private ele: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.openTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.viewContainerRef.clear();
  }

  private openTooltip() {
    let tooltip =
      this.viewContainerRef.createComponent(
        TooltipComponent
      );

    tooltip.instance.left = Math.round(
      this.ele.nativeElement.getBoundingClientRect()
        .left +
        this.ele.nativeElement.offsetWidth / 2
    );
    tooltip.instance.top =
      this.ele.nativeElement.getBoundingClientRect()
        .top +
      this.ele.nativeElement.offsetHeight +
      6;
    tooltip.instance.data = this.data;
  }
}
