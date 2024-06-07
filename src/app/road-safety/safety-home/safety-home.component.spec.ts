import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyHomeComponent } from './safety-home.component';

describe('SafetyHomeComponent', () => {
  let component: SafetyHomeComponent;
  let fixture: ComponentFixture<SafetyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
