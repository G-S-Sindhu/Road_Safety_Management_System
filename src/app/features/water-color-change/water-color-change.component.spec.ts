import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterColorChangeComponent } from './water-color-change.component';

describe('WaterColorChangeComponent', () => {
  let component: WaterColorChangeComponent;
  let fixture: ComponentFixture<WaterColorChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterColorChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterColorChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
