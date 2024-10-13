import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectsPageComponent } from './proyects-page.component';

describe('ProyectsPageComponent', () => {
  let component: ProyectsPageComponent;
  let fixture: ComponentFixture<ProyectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
