import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficJamHistoryComponent } from './traffic-jam-history.component';

describe('TrafficJamHistoryComponent', () => {
  let component: TrafficJamHistoryComponent;
  let fixture: ComponentFixture<TrafficJamHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficJamHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficJamHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
