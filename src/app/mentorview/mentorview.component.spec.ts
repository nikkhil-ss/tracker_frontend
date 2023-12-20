import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorviewComponent } from './mentorview.component';

describe('MentorviewComponent', () => {
  let component: MentorviewComponent;
  let fixture: ComponentFixture<MentorviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorviewComponent]
    });
    fixture = TestBed.createComponent(MentorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
