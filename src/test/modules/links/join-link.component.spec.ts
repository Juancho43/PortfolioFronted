import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinLinkComponent } from '@modules/links/join-link/join-link.component';

describe('JoinLinkComponent', () => {
  let component: JoinLinkComponent;
  let fixture: ComponentFixture<JoinLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
