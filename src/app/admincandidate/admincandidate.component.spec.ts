import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincandidateComponent } from './admincandidate.component';

describe('AdmincandidateComponent', () => {
  let component: AdmincandidateComponent;
  let fixture: ComponentFixture<AdmincandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmincandidateComponent]
    });
    fixture = TestBed.createComponent(AdmincandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
