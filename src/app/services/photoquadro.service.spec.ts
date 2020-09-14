import { TestBed } from '@angular/core/testing';


import { PhotoquadroService } from './photoquadro.service';

describe('PhotoquadroService', () => {
  let service: PhotoquadroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoquadroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
