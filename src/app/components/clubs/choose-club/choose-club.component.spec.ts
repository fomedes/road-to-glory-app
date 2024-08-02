import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClubComponent } from './choose-club.component';

describe('ChooseClubComponent', () => {
  let component: ChooseClubComponent;
  let fixture: ComponentFixture<ChooseClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
