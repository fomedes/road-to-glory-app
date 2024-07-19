import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
import { AuthDTO } from '../../../models/auth.dto';
import { AuthService, AuthToken } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  toaster = inject(ToastrService);

  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    // private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = new AuthDTO();

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService
      .login(this.loginUser)
      .pipe(
        finalize(async () => {
          // await this.sharedService.managementToast(
          //   'loginFeedback',
          //   responseOK,
          //   errorResponse
          // );
          // if (responseOK) {
          //   const headerInfo: HeaderMenus = {
          //     showAuthSection: true,
          //     showNoAuthSection: false,
          //   };
          //   this.headerMenusService.headerManagement.next(headerInfo);
          if (responseOK) {
            this.loginForm.reset();
            this.router.navigateByUrl('home');
          }
          // }
        })
      )
      .subscribe({
        next: (resp: AuthToken) => {
          responseOK = true;
          const username = resp.username;
          const token = resp.access_token;
          const user_id = resp.user_id;

          this.toaster.success(`Bienvenido ${username}! Empieza tu aventura!`);

          const auth = { token: token, user_id: user_id };
          this.authService.saveUser(auth);

          // this.authService.httpInterceptor = (request, next) => {
          //   const token = Cookies.get('access_token');
          //   if (token) {
          //     console.log('Authorization header added with token:', token);
          //     request = request.clone({
          //       setHeaders: { Authorization: `Bearer ${token}` },
          //     });
          //   } else {
          //     console.log('No access token found in cookie');
          //   }
          //   return next.handle(request);
          // };
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          console.error('Error en el inicio de sesión:', error);
          this.toaster.error(
            'Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.'
          );
        },
        // (error: HttpErrorResponse) => {
        //   responseOK = false;
        //   errorResponse = error.error;
        //   console.error('Full error:', error);
        //   const headerInfo: HeaderMenus = {
        //     showAuthSection: false,
        //     showNoAuthSection: true,
        //   };
        //   this.headerMenusService.headerManagement.next(headerInfo);

        //   this.sharedService.errorLog(error.error);
        // }
      });
  }
}
