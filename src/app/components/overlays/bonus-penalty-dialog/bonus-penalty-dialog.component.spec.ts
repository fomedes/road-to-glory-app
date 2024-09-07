import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusPenaltyDialogComponent } from './bonus-penalty-dialog.component';

describe('BonusPenaltyDialogComponent', () => {
  let component: BonusPenaltyDialogComponent;
  let fixture: ComponentFixture<BonusPenaltyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonusPenaltyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonusPenaltyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
