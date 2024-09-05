import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTeamsComponent } from './menu-teams.component';

describe('MenuTeamsComponent', () => {
  let component: MenuTeamsComponent;
  let fixture: ComponentFixture<MenuTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
