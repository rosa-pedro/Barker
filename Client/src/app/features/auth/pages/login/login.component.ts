import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginForm} from "../../models/forms.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(6)])
  })


  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm.controls.email.valueChanges.subscribe({
      next: (value) => {
        console.log(value)
      }
    })
  }

  login() {
    this.authService.login(this.loginForm.value as LoginForm)
  }
}
