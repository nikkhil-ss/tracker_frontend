import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchresultComponent } from './admin-searchresult.component';

describe('AdminSearchresultComponent', () => {
  let component: AdminSearchresultComponent;
  let fixture: ComponentFixture<AdminSearchresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSearchresultComponent]
    });
    fixture = TestBed.createComponent(AdminSearchresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
