import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingViolationsComponent } from './parking-violations.component';

describe('ParkingViolationsComponent', () => {
  let component: ParkingViolationsComponent;
  let fixture: ComponentFixture<ParkingViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingViolationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
