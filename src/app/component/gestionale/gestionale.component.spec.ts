import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionaleComponent } from './gestionale.component';

describe('GestionaleComponent', () => {
  let component: GestionaleComponent;
  let fixture: ComponentFixture<GestionaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionaleComponent]
    });
    fixture = TestBed.createComponent(GestionaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
