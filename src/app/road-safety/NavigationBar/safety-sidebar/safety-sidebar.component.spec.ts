import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetySidebarComponent } from './safety-sidebar.component';

describe('SafetySidebarComponent', () => {
  let component: SafetySidebarComponent;
  let fixture: ComponentFixture<SafetySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetySidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
