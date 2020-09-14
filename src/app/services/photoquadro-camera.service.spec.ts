import { TestBed } from '@angular/core/testing';

import { PhotoquadroCameraService } from './photoquadro-camera.service';

describe('PhotoquadroCameraService', () => {
  let service: PhotoquadroCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoquadroCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
