import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherInfoComponent } from './further-info.component';

describe('FurtherInfoComponent', () => {
  let component: FurtherInfoComponent;
  let fixture: ComponentFixture<FurtherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurtherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
