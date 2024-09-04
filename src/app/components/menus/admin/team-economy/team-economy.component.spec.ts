import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEconomyComponent } from './team-economy.component';

describe('TeamEconomyComponent', () => {
  let component: TeamEconomyComponent;
  let fixture: ComponentFixture<TeamEconomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamEconomyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamEconomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
