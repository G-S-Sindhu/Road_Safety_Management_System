import { TestBed } from '@angular/core/testing';

import { DashboardTrafficJamService } from './dashboard-traffic-jam.service';

describe('DashboardTrafficJamService', () => {
  let service: DashboardTrafficJamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardTrafficJamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
