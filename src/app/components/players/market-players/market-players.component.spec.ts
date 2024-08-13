import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlayersComponent } from './market-players.component';

describe('MarketPlayersComponent', () => {
  let component: MarketPlayersComponent;
  let fixture: ComponentFixture<MarketPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
