import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ToasterService} from "../../../shared/components/toaster/toaster.service";
import {LoginForm, SignupForm} from "../models/forms.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorSource = new Subject<any>();
  error$ = this.errorSource.asObservable();

  mock = false;
  constructor(private toasterService: ToasterService) { }

  login(loginForm: LoginForm) {
    console.log(loginForm);
    if(this.mock) {
      this.toasterService.showSuccessToast('Login was successful')
      this.mock = !this.mock
    }else{
      this.toasterService.showErrorToast('Username or Password is not correct')
      this.mock = !this.mock
    }
  }

  signup(signupForm: SignupForm) {
    console.log(signupForm);
    if(this.mock) {
      this.toasterService.showSuccessToast('Signup was successful')
      this.mock = !this.mock
    }else{
      this.toasterService.showErrorToast('Email already exists')
      this.mock = !this.mock
    }
  }


}
