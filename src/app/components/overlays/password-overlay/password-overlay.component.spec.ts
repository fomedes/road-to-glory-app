import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOverlayComponent } from './password-overlay.component';

describe('PasswordOverlayComponent', () => {
  let component: PasswordOverlayComponent;
  let fixture: ComponentFixture<PasswordOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
