import { TestBed } from '@angular/core/testing';

import { ParkingViolationsService } from './parking-violations.service';

describe('ParkingViolationsService', () => {
  let service: ParkingViolationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingViolationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
