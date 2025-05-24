import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMiniFormComponent } from '@modules/links/link-mini-form/link-mini-form.component';

describe('LinkMiniFormComponent', () => {
  let component: LinkMiniFormComponent;
  let fixture: ComponentFixture<LinkMiniFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkMiniFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkMiniFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
