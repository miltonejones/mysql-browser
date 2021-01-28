import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionNavComponent } from './connection-nav.component';

describe('ConnectionNavComponent', () => {
  let component: ConnectionNavComponent;
  let fixture: ComponentFixture<ConnectionNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
