import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingHistoryComponent } from './parking-history.component';

describe('ParkingHistoryComponent', () => {
  let component: ParkingHistoryComponent;
  let fixture: ComponentFixture<ParkingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
