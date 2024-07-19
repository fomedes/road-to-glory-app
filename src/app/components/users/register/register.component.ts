import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; //
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { UserDTO } from '../../../models/user.dto';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  toaster = inject(ToastrService);
  registerUser = new UserDTO();

  username: FormControl;
  email: FormControl;
  password: FormControl;
  country: FormControl;
  platform: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  platforms = ['PC', 'PS5', 'PS4', 'Xbox S|X', 'Xbox One X'];

  constructor(
    private FormBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.isValidForm = null;

    this.username = new FormControl(this.registerUser.username, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.email,
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]);

    this.country = new FormControl(this.registerUser.country, [
      Validators.required,
    ]);

    this.platform = new FormControl(this.registerUser.platform, [
      Validators.required,
    ]);

    this.registerForm = this.FormBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      country: this.country,
      platform: this.platform,
    });
  }

  ngOnInit(): void {}

  register(): void {
    console.log('Registration form submitted!');

    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    // if (this.registerForm.invalid) {
    //   return;
    // }

    this.isValidForm = true;

    this.registerUser = this.registerForm.value;

    this.userService
      .register(this.registerUser)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.registerForm.reset();
            this.router.navigateByUrl('home');
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
          this.toaster.success(
            'El registro fue satisfactorio! Empieza tu aventura!'
          );
          // this.registerForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          console.error('Error en el registro:', error);
          this.toaster.error(
            'Ocurrió un error durante el registro. Inténtalo de nuevo.'
          );

          // errorResponse = error.error;

          // const headerInfo: HeaderMenus = {
          //   showAuthSection: false,
          //   showNoAuthSection: true,
          // };

          // this.headerMenusService.headerManagement.next(headerInfo);
        },
      });
  }
}
