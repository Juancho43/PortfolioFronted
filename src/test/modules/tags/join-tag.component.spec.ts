import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTagComponent } from '@modules/tags/join-tag/join-tag.component';

describe('JoinTagComponent', () => {
  let component: JoinTagComponent;
  let fixture: ComponentFixture<JoinTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
