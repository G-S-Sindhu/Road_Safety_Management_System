import { TestBed } from '@angular/core/testing';

import { TrafficJamViolationsService } from './traffic-jam-violations.service';

describe('TrafficJamViolationsService', () => {
  let service: TrafficJamViolationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafficJamViolationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
