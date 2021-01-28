import { TestBed } from '@angular/core/testing';

import { ConnectionNavService } from './connection-nav.service';

describe('ConnectionNavService', () => {
  let service: ConnectionNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
