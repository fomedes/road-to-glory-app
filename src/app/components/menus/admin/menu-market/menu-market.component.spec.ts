import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMarketComponent } from './menu-market.component';

describe('MenuMarketComponent', () => {
  let component: MenuMarketComponent;
  let fixture: ComponentFixture<MenuMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
