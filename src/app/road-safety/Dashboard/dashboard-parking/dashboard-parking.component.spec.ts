import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardParkingComponent } from './dashboard-parking.component';

describe('DashboardParkingComponent', () => {
  let component: DashboardParkingComponent;
  let fixture: ComponentFixture<DashboardParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardParkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
