import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationListComponent } from '@modules/education/education-list/education-list.component';

describe('EducationListComponent', () => {
  let component: EducationListComponent;
  let fixture: ComponentFixture<EducationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
