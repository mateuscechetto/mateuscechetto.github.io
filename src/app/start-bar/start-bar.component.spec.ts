import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBarComponent } from './start-bar.component';

describe('StartBarComponent', () => {
  let component: StartBarComponent;
  let fixture: ComponentFixture<StartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
