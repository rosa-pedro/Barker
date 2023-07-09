import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() inputFC: FormControl = new FormControl();
  @Input() errorMessages: string[] = [];
  @Input() type = 'text';

  constructor() {}

  ngOnInit(): void {}

  getErrorList() {
    // const errorsList = Object.keys(this.inputFC.errors!);
    // let finalList = [];
    /*for (let e of errorsList) {
      switch (e) {
        case 'required':
          finalList.push('This field is required');
          break;
        case 'email':
          finalList.push('Email is not valid');
          break;
        case 'minlength':
          finalList.push('The minimum is not met');
          break;
        default:
          finalList.push('This field is wrong');
          break;
      }
    }*/
    // return finalList;
  }
}
