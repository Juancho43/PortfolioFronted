import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSearcherComponent } from './tag-searcher.component';

describe('TagSearcherComponent', () => {
  let component: TagSearcherComponent;
  let fixture: ComponentFixture<TagSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
