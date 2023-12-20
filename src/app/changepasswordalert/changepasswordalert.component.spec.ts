import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordalertComponent } from './changepasswordalert.component';

describe('ChangepasswordalertComponent', () => {
  let component: ChangepasswordalertComponent;
  let fixture: ComponentFixture<ChangepasswordalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepasswordalertComponent]
    });
    fixture = TestBed.createComponent(ChangepasswordalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
