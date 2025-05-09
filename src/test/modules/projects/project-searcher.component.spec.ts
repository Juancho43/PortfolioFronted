import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearcherComponent } from '@modules/projects/project-searcher/project-searcher.component';

describe('ProjectSearcherComponent', () => {
  let component: ProjectSearcherComponent;
  let fixture: ComponentFixture<ProjectSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
