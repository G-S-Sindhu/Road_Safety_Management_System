import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartVedioComponent } from './smart-vedio.component';

describe('SmartVedioComponent', () => {
  let component: SmartVedioComponent;
  let fixture: ComponentFixture<SmartVedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartVedioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
