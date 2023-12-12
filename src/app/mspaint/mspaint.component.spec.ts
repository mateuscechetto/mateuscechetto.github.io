import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MspaintComponent } from './mspaint.component';

describe('MspaintComponent', () => {
  let component: MspaintComponent;
  let fixture: ComponentFixture<MspaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MspaintComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MspaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
