import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarOverlayComponent } from './add-car-overlay.component';

describe('AddCarOverlayComponent', () => {
  let component: AddCarOverlayComponent;
  let fixture: ComponentFixture<AddCarOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
