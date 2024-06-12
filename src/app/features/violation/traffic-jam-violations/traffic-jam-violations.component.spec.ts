import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficJamViolationsComponent } from './traffic-jam-violations.component';

describe('TrafficJamViolationsComponent', () => {
  let component: TrafficJamViolationsComponent;
  let fixture: ComponentFixture<TrafficJamViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficJamViolationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficJamViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
