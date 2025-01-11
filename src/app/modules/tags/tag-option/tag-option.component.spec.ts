import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagOptionComponent } from './tag-option.component';

describe('TagOptionComponent', () => {
  let component: TagOptionComponent;
  let fixture: ComponentFixture<TagOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
