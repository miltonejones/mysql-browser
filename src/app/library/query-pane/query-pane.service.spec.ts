import { TestBed } from '@angular/core/testing';

import { QueryPaneService } from './query-pane.service';

describe('QueryPaneService', () => {
  let service: QueryPaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryPaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
