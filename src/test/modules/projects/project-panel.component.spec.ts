import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPanelComponent } from '@modules/projects/project-panel/project-panel.component';

describe('ProjectPanelComponent', () => {
  let component: ProjectPanelComponent;
  let fixture: ComponentFixture<ProjectPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
