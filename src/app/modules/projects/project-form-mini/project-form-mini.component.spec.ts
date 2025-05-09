import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormMiniComponent } from './project-form-mini.component';

describe('ProjectFormMiniComponent', () => {
  let component: ProjectFormMiniComponent;
  let fixture: ComponentFixture<ProjectFormMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFormMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFormMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
