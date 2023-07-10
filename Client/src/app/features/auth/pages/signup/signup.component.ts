import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupForm } from '../../models/forms.model';

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
          },
        });
      }
    });
  }

  signup() {
    this.authService.signup(this.signupForm.value as SignupForm).subscribe();
  }
}
