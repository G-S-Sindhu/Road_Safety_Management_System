import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigarationComponent } from './configaration.component';

describe('ConfigarationComponent', () => {
  let component: ConfigarationComponent;
  let fixture: ComponentFixture<ConfigarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigarationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
