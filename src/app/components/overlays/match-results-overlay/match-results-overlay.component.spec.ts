import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultsOverlayComponent } from './match-results-overlay.component';

describe('MatchResultsOverlayComponent', () => {
  let component: MatchResultsOverlayComponent;
  let fixture: ComponentFixture<MatchResultsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchResultsOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchResultsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
