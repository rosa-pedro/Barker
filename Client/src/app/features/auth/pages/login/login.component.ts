import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../models/forms.model';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../shared/components/toaster/toaster.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loginForm.controls.userName.valueChanges.subscribe({
      next: () => {},
    });
  }

  login() {
    this.errors = [];
    this.authService.login(this.loginForm.value as LoginForm).subscribe({
      next: () => {
        this.toasterService.showSuccessToast('Signup was successful');
        this.router.navigateByUrl('/posts');
      },
      error: (error) => {
        this.toasterService.showErrorToast('One or more fields are wrong!');

        if (error.error === 'Invalid user') {
          this.errors.push('This user does not exist');
        }
        if (error.error === 'Invalid password') {
          this.errors.push('Wrong password');
        }
        if (error.error.errors.Password) {
          error.error.errors.Password.forEach((err: any) => {
            this.errors.push(err);
          });
        }
      },
    });
  }
}
