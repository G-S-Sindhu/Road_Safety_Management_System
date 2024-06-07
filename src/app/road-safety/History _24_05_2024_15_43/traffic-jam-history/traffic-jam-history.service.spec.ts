import { TestBed } from '@angular/core/testing';

import { TrafficJamHistoryService } from './traffic-jam-history.service';

describe('TrafficJamHistoryService', () => {
  let service: TrafficJamHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafficJamHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
