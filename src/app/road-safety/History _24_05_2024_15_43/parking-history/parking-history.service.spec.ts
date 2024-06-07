import { TestBed } from '@angular/core/testing';

import { ParkingHistoryService } from './parking-history.service';

describe('ParkingHistoryService', () => {
  let service: ParkingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
