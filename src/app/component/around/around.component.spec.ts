import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AroundComponent } from './around.component';

describe('AroundComponent', () => {
  let component: AroundComponent;
  let fixture: ComponentFixture<AroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AroundComponent]
    });
    fixture = TestBed.createComponent(AroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
