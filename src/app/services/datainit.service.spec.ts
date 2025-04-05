import { TestBed } from '@angular/core/testing';

import { DatainitService } from './datainit.service';

describe('DatainitService', () => {
  let service: DatainitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatainitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
