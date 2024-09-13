import { TestBed } from '@angular/core/testing';

import { RaccomandazioneService } from './raccomandazione.service';

describe('RaccomandazioneService', () => {
  let service: RaccomandazioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaccomandazioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
