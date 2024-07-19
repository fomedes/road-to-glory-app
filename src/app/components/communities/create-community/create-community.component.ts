import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CommunityDTO } from '../../../models/community.dto';
import { AuthService } from '../../../services/auth.service';
import { CommunityService } from '../../../services/community.service';

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButton,
    MatStepperModule,
    MatCheckboxModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
})
export class CreateCommunityComponent implements OnInit {
  toaster = inject(ToastrService);
  newCommunity = new CommunityDTO();

  // Form Options
  isPrivateOptions = ['Privada', 'Pública'];
  platforms = ['PC', 'PS5', 'PS4', 'Xbox S|X', 'Xbox One X'];

  startingTeamOptions = ['Aleatorio', 'Sin Equipo'];
  randomPlayerOptions = [
    { name: 'Aleatorio', value: true },
    { name: 'Todos', value: false },
  ];
  bidWindowOptions = [
    { name: 'Instantáneo', value: 'instant' },
    { name: '24 horas', value: '24' },
    { name: '48 horas', value: '48' },
    { name: '72 horas', value: '72' },
  ];
  announceBidOptions = [
    { name: 'Sin Anuncios', value: 'none' },
    { name: 'Anunciar Jugador', value: 'player' },
    { name: 'Anunciar Cantidad', value: 'amount' },
    { name: 'Anunciar Jugador y Cantidad', value: 'both' },
  ];

  defaultPrices: any[] = [];

  communityForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private communityService: CommunityService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isValidForm = null;

    this.communityForm = this.formBuilder.group({
      step1: this.formBuilder.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        isPrivate: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        communityPlatforms: new FormControl([], [Validators.required]),
      }),
      step2: this.formBuilder.group({
        startingBudget: new FormControl(1000000, [Validators.required]),
        startingTeam: new FormControl('', [Validators.required]),
      }),
      step3: this.formBuilder.group({
        randomPlayers: new FormControl(false, [Validators.required]),
        minOvr: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]),
        maxOvr: new FormControl(100, [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]),
        bidWindow: new FormControl('instant', [Validators.required]),
        announceBid: new FormControl('none', [Validators.required]),
        playerPrices: this.formBuilder.array([]),
      }),
    });

    // Password activation
    this.communityForm
      .get('step1.isPrivate')!
      .valueChanges.subscribe((value) => {
        this.togglePasswordField(value === 'true');
      });
  }

  ngOnInit(): void {
    this.loadDefaultPrices();
  }

  togglePasswordField(isPrivate: boolean): void {
    const passwordControl = this.communityForm.get(
      'step1.password'
    ) as FormControl;
    if (isPrivate) {
      passwordControl.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]);
    } else {
      passwordControl.clearValidators();
    }
    passwordControl.updateValueAndValidity();
  }

  createCommunity() {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.populateNewCommunity(this.communityForm);

    console.log(this.newCommunity);

    this.communityService
      .createCommunity(this.newCommunity)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.communityForm.reset();
            this.router.navigateByUrl('home');
          }
        })
      )
      .subscribe({
        next: (response) => {
          responseOK = true;
          console.log(response);
          this.toaster.success(
            `${this.newCommunity.name} se ha creado satisfactoriamente`
          );
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          console.error(error);
          this.toaster.error(
            'Ocurrió un error al crear la comunidad. Inténtalo de nuevo.'
          );
        },
      });
  }

  private populateNewCommunity(communityForm: FormGroup) {
    const step1 = communityForm.get('step1') as FormGroup;
    this.newCommunity.name = step1.get('name')?.value;
    this.newCommunity.isPrivate = step1.get('isPrivate')?.value;
    this.newCommunity.password = step1.get('password')?.value;
    this.newCommunity.communityPlatforms =
      step1.get('communityPlatforms')?.value;

    const step2 = communityForm.get('step2') as FormGroup;
    this.newCommunity.startingBudget = step2.get('startingBudget')?.value;
    this.newCommunity.startingTeam = step2.get('startingTeam')?.value;

    const step3 = communityForm.get('step3') as FormGroup;
    this.newCommunity.market.randomPlayers = step3.get('randomPlayers')?.value;
    this.newCommunity.market.minOvr = step3.get('minOvr')?.value;
    this.newCommunity.market.maxOvr = step3.get('maxOvr')?.value;
    this.newCommunity.market.bidWindow = step3.get('bidWindow')?.value;
    this.newCommunity.market.announceBid = step3.get('announceBid')?.value;

    const user_id = this.getUserId();
    if (user_id) {
      this.newCommunity.admins.push(user_id);
    } else {
      console.error('Failed to get user ID from AuthService');
    }
  }

  private getUserId() {
    const user = this.authService.getUserId();
    if (user) {
      return user;
    } else {
      console.error('Failed to get user ID from AuthService');
      return null;
    }
  }
  private loadDefaultPrices(): void {
    this.communityService.getDefaultPrices().subscribe({
      next: (data) => {
        this.defaultPrices = data;
        this.communityForm.get('step3.playerPrices')?.patchValue(data);
      },
      error: (error) => {
        console.error('Failed to load default prices', error);
      },
    });
  }
}
