import { TestBed } from '@angular/core/testing';

import { ComponentContainerService } from './component-container.service';

describe('ComponentContainerService', () => {
  let service: ComponentContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
