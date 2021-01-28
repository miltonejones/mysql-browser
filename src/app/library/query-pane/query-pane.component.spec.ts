import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPaneComponent } from './query-pane.component';

describe('QueryPaneComponent', () => {
  let component: QueryPaneComponent;
  let fixture: ComponentFixture<QueryPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
