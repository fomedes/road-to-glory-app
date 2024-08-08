import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navigation, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TeamService } from '../../../services/team.service';
import { ChooseClubComponent } from './choose-club.component';

describe('ChooseClubComponent', () => {
  let component: ChooseClubComponent;
  let fixture: ComponentFixture<ChooseClubComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let teamService: jasmine.SpyObj<TeamService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: jasmine.SpyObj<Router>;

  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const teamServiceSpy = jasmine.createSpyObj('TeamService', ['createTeam']);
  const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
    'getItem',
  ]);
  const routerSpy = jasmine.createSpyObj('Router', [
    'navigateByUrl',
    'getCurrentNavigation',
  ]);

  beforeEach(async () => {
    const urlTree: UrlTree = routerSpy.createUrlTree([]);
    const mockNavigation: Navigation = {
      id: 1,
      initialUrl: urlTree,
      extractedUrl: urlTree,
      trigger: 'imperative',
      previousNavigation: null,
      extras: {
        state: {
          community: {
            id: '123',
            name: 'Community Name',
            isPrivate: true,
            password: 'password',
            communityPlatforms: ['platform1', 'platform2'],
            admins: ['admin1', 'admin2'],
            users: ['user1', 'user2'],
            startingBudget: '1000',
            market: {
              maxOvr: 90,
              minOvr: 50,
              randomPlayers: false,
              playerPrices: [],
            },
          },
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ChooseClubComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: TeamService, useValue: teamServiceSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
