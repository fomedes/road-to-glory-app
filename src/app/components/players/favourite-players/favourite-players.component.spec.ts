import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePlayersComponent } from './favourite-players.component';

describe('FavouritePlayersComponent', () => {
  let component: FavouritePlayersComponent;
  let fixture: ComponentFixture<FavouritePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritePlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
