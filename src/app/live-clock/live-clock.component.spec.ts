import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClockComponent } from './live-clock.component';

describe('LiveClockComponent', () => {
  let component: LiveClockComponent;
  let fixture: ComponentFixture<LiveClockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveClockComponent]
    });
    fixture = TestBed.createComponent(LiveClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
