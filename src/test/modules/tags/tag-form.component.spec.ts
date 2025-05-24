import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagMiniFormComponent } from '@modules/tags/tag-mini-form/tag-mini-form.component';

describe('TagMiniFormComponent', () => {
  let component: TagMiniFormComponent;
  let fixture: ComponentFixture<TagMiniFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagMiniFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagMiniFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
