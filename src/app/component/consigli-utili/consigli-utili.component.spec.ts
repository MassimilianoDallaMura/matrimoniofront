import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigliUtiliComponent } from './consigli-utili.component';

describe('ConsigliUtiliComponent', () => {
  let component: ConsigliUtiliComponent;
  let fixture: ComponentFixture<ConsigliUtiliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsigliUtiliComponent]
    });
    fixture = TestBed.createComponent(ConsigliUtiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
