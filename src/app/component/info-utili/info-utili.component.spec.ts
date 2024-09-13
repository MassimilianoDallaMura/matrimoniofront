import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUtiliComponent } from './info-utili.component';

describe('InfoUtiliComponent', () => {
  let component: InfoUtiliComponent;
  let fixture: ComponentFixture<InfoUtiliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoUtiliComponent]
    });
    fixture = TestBed.createComponent(InfoUtiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
