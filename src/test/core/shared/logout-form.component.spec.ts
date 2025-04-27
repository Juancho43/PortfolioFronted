import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutFormComponent } from '@modules/auth/logout-form/logout-form.component';

describe('LogoutFormComponent', () => {
  let component: LogoutFormComponent;
  let fixture: ComponentFixture<LogoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
