import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasroleGuard } from './hasrole.guard';

describe('hasroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
