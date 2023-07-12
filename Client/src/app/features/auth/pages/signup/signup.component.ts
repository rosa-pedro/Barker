import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupForm } from '../../models/forms.model';
import { ToasterService } from '../../../../shared/components/toaster/toaster.service';
import { Router } from '@angular/router';

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

  usernameAvailability: { canUse: boolean; message: string } | null = null;
  passwordErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm.controls.username.valueChanges.subscribe((value) => {
      if (value && value !== '') {
        this.authService.isUserNameAvailable(value).subscribe({
          next: (canUseUsername) => {
            console.log(canUseUsername);
            if (canUseUsername) {
              this.usernameAvailability = {
                canUse: canUseUsername,
                message: 'This username is available',
              };
            } else {
              this.usernameAvailability = {
                canUse: canUseUsername,
                message: 'This username is taken',
              };
            }
          },
        });
      } else {
        this.usernameAvailability = null;
      }
    });
  }

  signup() {
    this.authService.signup(this.signupForm.value as SignupForm).subscribe({
      next: () => {
        this.toasterService.showSuccessToast('Signup was successful');
        this.router.navigateByUrl('/posts');
      },
      error: (error) => {
        this.toasterService.showErrorToast(
          'Some fields do not meet requirements'
        );

        this.passwordErrors = [];
        if (error.error) {
          error.error.forEach((err: any) => {
            this.passwordErrors.push(err.description);
          });
        }
      },
    });
  }
}
