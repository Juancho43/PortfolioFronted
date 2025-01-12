import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPanelComponent } from './education-panel.component';

describe('EducationPanelComponent', () => {
  let component: EducationPanelComponent;
  let fixture: ComponentFixture<EducationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
