import { TestBed } from '@angular/core/testing';

import { NoParkingHistoryService } from './no-parking-history.service';

describe('NoParkingHistoryService', () => {
  let service: NoParkingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoParkingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
