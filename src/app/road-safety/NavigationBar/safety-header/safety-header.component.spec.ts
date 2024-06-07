import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyHeaderComponent } from './safety-header.component';

describe('SafetyHeaderComponent', () => {
  let component: SafetyHeaderComponent;
  let fixture: ComponentFixture<SafetyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
