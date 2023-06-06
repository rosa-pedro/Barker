export interface LoginForm {
  userName: string;
  password: string;
}

export interface SignupForm extends LoginForm {
  username: string;
}
