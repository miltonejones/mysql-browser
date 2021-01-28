import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryViewComponent } from './query-view.component';

describe('QueryViewComponent', () => {
  let component: QueryViewComponent;
  let fixture: ComponentFixture<QueryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
