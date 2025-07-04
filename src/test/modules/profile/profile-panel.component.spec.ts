import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProfilePanelComponent from '@modules/profile/profile-panel/profile-panel.component';

describe('ProfilePanelComponent', () => {
  let component: ProfilePanelComponent;
  let fixture: ComponentFixture<ProfilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
