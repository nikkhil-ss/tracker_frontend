import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMentorComponent } from './home-mentor.component';

describe('HomeMentorComponent', () => {
  let component: HomeMentorComponent;
  let fixture: ComponentFixture<HomeMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMentorComponent]
    });
    fixture = TestBed.createComponent(HomeMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
