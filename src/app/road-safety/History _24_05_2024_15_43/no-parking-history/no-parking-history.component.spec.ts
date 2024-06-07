import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoParkingHistoryComponent } from './no-parking-history.component';

describe('NoParkingHistoryComponent', () => {
  let component: NoParkingHistoryComponent;
  let fixture: ComponentFixture<NoParkingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoParkingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoParkingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
