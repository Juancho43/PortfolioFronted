import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgProfileFormComponent } from '@modules/profile/img-profile-form/img-profile-form.component';

describe('ImgProfileFormComponent', () => {
  let component: ImgProfileFormComponent;
  let fixture: ComponentFixture<ImgProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgProfileFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
