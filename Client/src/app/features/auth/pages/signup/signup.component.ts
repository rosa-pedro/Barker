import { Component, Directive, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  Validator,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupForm } from '../../models/forms.model';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    username: new FormControl('', [Validators.required]),
  });

  errorMessages: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm.controls.username.valueChanges.subscribe((value) => {
      if (value) {
        this.authService.isUserNameAvailable(value).subscribe({
          next: (isAvailable) => {
            if (isAvailable) {
              this.errorMessages.push('This username is taken');
            } else {
              this.errorMessages = [];
            }
            console.log(isAvailable);
          },
        });
      }
    });
  }

  signup() {
    this.authService.signup(this.signupForm.value as SignupForm).subscribe();
  }
}
