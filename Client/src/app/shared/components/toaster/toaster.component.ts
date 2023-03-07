import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {EventTypes, ToasterService} from "./toaster.service";
import {Subscription} from "rxjs";

export interface ToastEvent {
  type: EventTypes;
  message: string;
}

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit, AfterViewInit{
  currentToasts: ToastEvent[] = [];
  toasterSubscription: Subscription = new Subscription();

  constructor(
    private toasterService: ToasterService,
    private _elmRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.toasterSubscription = this.toasterService.toasts.subscribe(
      (toast) => {
        this._elmRef.nativeElement.style.display = toast ? 'block' : 'none';
        const currentToast: ToastEvent = {
          type: toast.type,
          message: toast.message,
        };
        this.currentToasts.push(currentToast);

        this.cdr.detectChanges();
        setTimeout(() => {
          this.dispose();
        }, 5000);
      }
    );
  }

  dispose() {
    this.currentToasts.splice(0, 1);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.toasterSubscription.unsubscribe();
  }


}
