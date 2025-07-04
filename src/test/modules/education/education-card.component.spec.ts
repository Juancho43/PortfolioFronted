import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCardComponent } from '@modules/education/education-card/education-card.component';

describe('EducationCardComponent', () => {
  let component: EducationCardComponent;
  let fixture: ComponentFixture<EducationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
