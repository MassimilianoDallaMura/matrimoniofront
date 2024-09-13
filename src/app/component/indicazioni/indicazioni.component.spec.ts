import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicazioniComponent } from './indicazioni.component';

describe('IndicazioniComponent', () => {
  let component: IndicazioniComponent;
  let fixture: ComponentFixture<IndicazioniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicazioniComponent]
    });
    fixture = TestBed.createComponent(IndicazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
