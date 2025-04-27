import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProfileFormComponent } from '@modules/profile/cv-profile-form/cv-profile-form.component';

describe('CvProfileFormComponent', () => {
  let component: CvProfileFormComponent;
  let fixture: ComponentFixture<CvProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvProfileFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
