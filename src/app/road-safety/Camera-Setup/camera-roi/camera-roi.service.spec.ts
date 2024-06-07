import { TestBed } from '@angular/core/testing';

import { CameraRoiService } from './camera-roi.service';

describe('CameraRoiService', () => {
  let service: CameraRoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraRoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
