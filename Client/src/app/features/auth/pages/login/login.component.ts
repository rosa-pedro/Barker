import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../models/forms.model';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../shared/components/toaster/toaster.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loginForm.controls.userName.valueChanges.subscribe({
      next: (value) => {},
    });
  }

  login() {
    this.authService.login(this.loginForm.value as LoginForm).subscribe({
      next: () => {
        this.toasterService.showSuccessToast('Signup was successful');
        this.router.navigateByUrl('/posts');
      },
    });
  }
}
