import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBudgetsComponent } from './menu-budgets.component';

describe('MenuBudgetsComponent', () => {
  let component: MenuBudgetsComponent;
  let fixture: ComponentFixture<MenuBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBudgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
