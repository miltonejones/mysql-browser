import { TestBed } from '@angular/core/testing';

import { ToolbarButtonService } from './toolbar-button.service';

describe('ToolbarButtonService', () => {
  let service: ToolbarButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
