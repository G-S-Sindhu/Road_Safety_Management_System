import { TestBed } from '@angular/core/testing';

import { DashboardParkingService } from './dashboard-parking.service';

describe('DashboardParkingService', () => {
  let service: DashboardParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
