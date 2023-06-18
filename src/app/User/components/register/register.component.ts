import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  username: FormControl;
  platform: FormControl;
  email: FormControl;
  password: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  platformOptions: string[] = [
    'Ps4',
    'Ps5',
    'Xbox One',
    'Xbox Series',
    'Stadia',
    'PC',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerUser = new UserDTO('', '', '', '');

    this.isValidForm = null;

    this.username = new FormControl(this.registerUser.username, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.platform = new FormControl('', [Validators.required]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group({
      username: this.username,
      platform: this.platform,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      username: this.registerUser.username,
      platform: this.registerUser.platform,
      email: this.registerUser.email,
      password: this.registerUser.password,
    };

    this.userService.registerUser(user).subscribe(
      (response) => {
        console.log('User registration successful:', response);
        // Redirect to the login page
        this.router.navigateByUrl('login');
      },
      (error) => {
        console.error('User registration error:', error);
      }
    );
  }

  getValidationMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.invalid && control?.touched) {
      for (const errorKey in control.errors) {
        if (control.errors.hasOwnProperty(errorKey)) {
          switch (errorKey) {
            case 'required':
              return 'El campo es obligatorio';
            case 'minlength':
              return `Mínimo ${control.errors[errorKey].requiredLength} caracteres`;
            case 'maxlength':
              return `Máximo ${control.errors[errorKey].requiredLength} caracteres`;
            case 'pattern':
              return 'El formato no es correcto';
            default:
              return '';
          }
        }
      }
    }
    return '';
  }
}
