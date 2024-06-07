import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrafficJamComponent } from './dashboard-traffic-jam.component';

describe('DashboardTrafficJamComponent', () => {
  let component: DashboardTrafficJamComponent;
  let fixture: ComponentFixture<DashboardTrafficJamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrafficJamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTrafficJamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
