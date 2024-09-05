import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminToolsComponent } from './menu-admin-tools.component';

describe('MenuAdminToolsComponent', () => {
  let component: MenuAdminToolsComponent;
  let fixture: ComponentFixture<MenuAdminToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdminToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAdminToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
