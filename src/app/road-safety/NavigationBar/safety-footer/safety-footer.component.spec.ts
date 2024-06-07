import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyFooterComponent } from './safety-footer.component';

describe('SafetyFooterComponent', () => {
  let component: SafetyFooterComponent;
  let fixture: ComponentFixture<SafetyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
