import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {AuthService} from "../../services/auth.service";
import {SignupForm} from "../../models/forms.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    username: new FormControl('', [Validators.required]),
  })


  constructor(/* private authService: AuthService */) {
  }

  signup() {
    // this.authService.signup(this.signupForm.value as SignupForm)
  }
}
